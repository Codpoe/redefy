const fs = require('fs');
const toCamelCase = require('./toCamelCase.js');
let importStr = '';
let exportStr = 'export default {\n';

fs.readdirSync('./docs/zh-CN', { encoding: 'utf8' })
    .forEach(fileName => {
        const camelCaseName = toCamelCase(fileName).split('.')[0];
        importStr += `import ${camelCaseName} from './zh-CN/${fileName}';\n`;
        exportStr += `    ${camelCaseName},\n`;
    });

exportStr += '};\n';

fs.writeFileSync('./docs/index.js', importStr + '\n' + exportStr, 'utf8');
