/* Storage: IndexedDB (cards, append-only review log, key-value), with in-memory copies. */
'use strict';

const DB_NAME = 'station528', DB_VER = 1;
let IDB = null;
const MEM = { cards: {}, kv: {} };

function idbOpen() {
  return new Promise((res, rej) => {
    if (!('indexedDB' in self)) return rej(new Error('IndexedDB unavailable'));
    const r = indexedDB.open(DB_NAME, DB_VER);
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('cards')) d.createObjectStore('cards', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('logs')) d.createObjectStore('logs', { keyPath: 'n', autoIncrement: true });
      if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv', { keyPath: 'k' });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
function tx(store, mode, fn) {
  return new Promise((res, rej) => {
    const t = IDB.transaction(store, mode), s = t.objectStore(store);
    let out; try { out = fn(s); } catch (e) { rej(e); return; }
    t.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
    t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
  });
}
const getAll = store => new Promise((res, rej) => { const r = IDB.transaction(store).objectStore(store).getAll(); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

async function dbLoad() {
  IDB = await idbOpen();
  for (const c of await getAll('cards')) MEM.cards[c.id] = c;
  for (const e of await getAll('kv')) MEM.kv[e.k] = e.v;
}
function saveCard(c) { MEM.cards[c.id] = c; return tx('cards', 'readwrite', s => s.put(c)).catch(dbFail); }
function saveCards(list) { for (const c of list) MEM.cards[c.id] = c; return tx('cards', 'readwrite', s => { for (const c of list) s.put(c); }).catch(dbFail); }
function kvGet(k, d) { return k in MEM.kv ? MEM.kv[k] : d; }
function kvSet(k, v) { MEM.kv[k] = v; return tx('kv', 'readwrite', s => s.put({ k, v })).catch(dbFail); }
function addLog(entry) { return tx('logs', 'readwrite', s => s.add(entry)).catch(dbFail); }
const allLogs = () => getAll('logs');
let dbFailed = false;
function dbFail(e) { if (!dbFailed) { dbFailed = true; console.error(e); if (self.toast) toast('Could not save to this browser\'s storage. Export a backup now.'); } }

async function exportAll() {
  return { app: 'station-528', version: 1, exportedAt: new Date().toISOString(), cards: Object.values(MEM.cards), logs: await allLogs(), kv: MEM.kv };
}
async function importAll(data) {
  if (!data || data.app !== 'station-528' || !Array.isArray(data.cards) || !Array.isArray(data.logs) || typeof data.kv !== 'object') throw new Error('This file is not a Station 528 backup.');
  await tx('cards', 'readwrite', s => { s.clear(); for (const c of data.cards) s.put(c); });
  await tx('logs', 'readwrite', s => { s.clear(); for (const l of data.logs) s.put(l); });
  await tx('kv', 'readwrite', s => { s.clear(); for (const [k, v] of Object.entries(data.kv)) s.put({ k, v }); });
  MEM.cards = {}; MEM.kv = {};
  for (const c of data.cards) MEM.cards[c.id] = c;
  Object.assign(MEM.kv, data.kv);
}
async function wipeAll() {
  await tx('cards', 'readwrite', s => s.clear()); await tx('logs', 'readwrite', s => s.clear()); await tx('kv', 'readwrite', s => s.clear());
  MEM.cards = {}; MEM.kv = {};
}
