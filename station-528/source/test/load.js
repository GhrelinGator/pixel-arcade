/* Load src files into one scope (like the browser build) and return their top-level names. */
const fs = require('fs'), path = require('path');
module.exports = function load(files) {
  const code = files.map(f => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8')).join('\n;\n');
  const names = new Set();
  for (const m of code.matchAll(/^(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*))/gm)) names.add(m[1] || m[2]);
  return new Function(code + '\nreturn {' + [...names].join(',') + '};')();
};
