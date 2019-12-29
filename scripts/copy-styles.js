const fs = require('fs-extra');
const path = require('path');
const esDir = path.resolve(__dirname, '../es');
const libDir = path.resolve(__dirname, '../lib');

// copy css file from es to lib
fs.copySync(esDir, libDir, {
  filter: src => {
    return fs.statSync(src).isDirectory() || path.extname(src) === '.css';
  },
});
