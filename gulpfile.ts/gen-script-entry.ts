import through2 from 'through2';
import Vinyl from 'vinyl';
import { Transform } from 'stream';
import { getPkg } from './utils';

function generateComponentStyleEntry(
  this: Transform,
  name: string,
  deps: string[]
) {
  const styleImports = [
    ...deps.map(dep => `import '../../${dep}/style';`),
    `import '../index.css';`,
  ];
  const rawStyleImports = [
    ...deps.map(dep => `import '../../${dep}/style/raw';`),
    `import '../index.less';`,
  ];

  this.push(
    new Vinyl({
      path: `${name}/style/index.ts`,
      contents: Buffer.from(styleImports.join('\n')),
    })
  );

  this.push(
    new Vinyl({
      path: `${name}/style/raw.ts`,
      contents: Buffer.from(rawStyleImports.join('\n')),
    })
  );
}

function generatePackageEntry(this: Transform, names: string[]) {
  const exports = names
    .filter(name => name !== 'flat-deps')
    .map(name => `export * from './${name}/index';`)
    .join('\n');
  const versionExport = `export const version = '${getPkg('version')}';`;

  this.push(
    new Vinyl({
      path: 'index.ts',
      contents: Buffer.from(`${exports}\n${versionExport}`),
    })
  );
}

export default function() {
  return through2.obj(function(file: Vinyl, enc, cb) {
    if (file.isNull() || !file.contents) {
      return cb();
    }

    const depsMap: Record<string, string[]> = JSON.parse(
      file.contents.toString()
    );
    const names = Object.keys(depsMap).filter(name => name !== 'flat-deps');

    // generate style/index.ts, style/raw.ts
    names.forEach(name => {
      generateComponentStyleEntry.call(this, name, depsMap[name] || []);
    });

    // generate index.ts
    generatePackageEntry.call(this, names);

    cb();
  });
}
