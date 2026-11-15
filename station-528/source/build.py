#!/usr/bin/env python3
"""Build Station 528 into a single self-contained page plus PWA files in site/."""
import hashlib, json, os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
OUT = os.path.join(ROOT, 'site')
JS = ['engine.js', 'session.js', 'content_core.js', 'content_chem.js', 'content_bio.js', 'content_phys.js', 'content_chem2.js', 'content_bio2.js', 'content_phys2.js', 'content_check.js', 'db.js', 'ui.js']

def read(name):
    with open(os.path.join(SRC, name), encoding='utf-8') as f:
        return f.read()

css = read('style.css')
js = '\n;\n'.join(f'/* ==== {n} ==== */\n' + read(n) for n in JS)
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f4f2ed" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#101315" media="(prefers-color-scheme: dark)">
<meta name="description" content="Station 528: spaced retrieval, confidence bets and calibration for MCAT study.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Station 528">
<title>Station 528</title>
<style>
{css}
</style>
</head>
<body>
<main id="app" aria-live="polite"></main>
<div id="toast" role="status"></div>
<script>
{js}
</script>
</body>
</html>
'''
version = hashlib.sha1(html.encode()).hexdigest()[:10]
os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)

manifest = {
    'name': 'Station 528', 'short_name': 'Station 528', 'start_url': './', 'scope': './', 'display': 'standalone',
    'background_color': '#101315', 'theme_color': '#101315', 'description': 'MCAT study: spaced retrieval with confidence bets.',
    'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}],
}
with open(os.path.join(OUT, 'manifest.webmanifest'), 'w') as f:
    json.dump(manifest, f, indent=1)

sw = f'''/* Station 528 service worker: works offline; the page itself is fetched fresh when online. */
const VERSION = '{version}';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => {{ e.waitUntil(caches.open('s528-' + VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); }});
self.addEventListener('activate', e => {{ e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('s528-') && k !== 's528-' + VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); }});
self.addEventListener('fetch', e => {{
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {{
    e.respondWith(fetch(req).then(res => {{ const copy = res.clone(); caches.open('s528-' + VERSION).then(c => c.put('index.html', copy)); return res; }})
      .catch(() => caches.match('index.html', {{ ignoreSearch: true }})));
    return;
  }}
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
}});
'''
with open(os.path.join(OUT, 'sw.js'), 'w') as f:
    f.write(sw)

# icons: a schematic station (hub, ring, lit modules)
icon_dir = os.path.join(ROOT, 'icons')
if not os.path.exists(os.path.join(icon_dir, 'icon-512.png')):
    from PIL import Image, ImageDraw
    import math
    os.makedirs(icon_dir, exist_ok=True)
    S = 1024
    im = Image.new('RGB', (S, S), '#101315'); d = ImageDraw.Draw(im)
    cx = cy = S // 2
    d.ellipse([cx - 300, cy - 300, cx + 300, cy + 300], outline='#4fb0ad', width=22)
    d.ellipse([cx - 92, cy - 92, cx + 92, cy + 92], fill='#4fb0ad')
    for k in range(11):
        a = -math.pi / 2 + k * 2 * math.pi / 11
        x, y = cx + 300 * math.cos(a), cy + 300 * math.sin(a)
        d.line([cx + 92 * math.cos(a), cy + 92 * math.sin(a), x, y], fill='#2d4a49', width=10)
        r = 46
        d.rounded_rectangle([x - r, y - r, x + r, y + r], radius=12, fill='#f0b44f' if k % 3 else '#2a3036', outline='#e9e7e2', width=8)
    for size, name in [(512, 'icon-512.png'), (192, 'icon-192.png'), (180, 'apple-touch-icon.png')]:
        im.resize((size, size), Image.LANCZOS).save(os.path.join(icon_dir, name))
for name in ['icon-512.png', 'icon-192.png', 'apple-touch-icon.png']:
    shutil.copy(os.path.join(icon_dir, name), os.path.join(OUT, name))
print('built', len(html), 'bytes, version', version)
