const fs = require('fs');
let importStr = '';
let exportStr = 'export default {\n';

fs.readdirSync('./docs/zh-CN', { encoding: 'utf8' }).forEach(fileName => {
  const name = fileName.split('.')[0];
  importStr += `import ${name} from './zh-CN/${fileName}';\n`;
  exportStr += `    ${name},\n`;
});

exportStr += '};\n';

fs.writeFileSync('./docs/index.js', importStr + '\n' + exportStr, 'utf8');
