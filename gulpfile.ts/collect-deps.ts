import through2 from 'through2';
import Vinyl from 'vinyl';
import path from 'path';
import fs from 'fs-extra';
import { isComponentScript, getComponentName } from './utils';
import { DEPS_MAP_JSON_PATH, IMPORT_RE } from './constants';

interface Options {
  cache: boolean;
}

let depsMap: Record<string, string[]> = {};

function removeStyleImport(code: string) {
  return code.replace(/import\s+('|").+?\.less('|");?\n?/g, '');
}

function getDeps(filePath: string, name: string, code: string): string[] {
  return (code.match(IMPORT_RE) || [])
    .map(item => {
      let [, importName, importPath] =
        item.match(/import\s+(\w+)[\s|,]+.*?from\s+['|"](.+?)['|"]/) || [];

      if (
        importName &&
        importPath &&
        code.includes(`<${importName}`) &&
        !path.isAbsolute(importPath)
      ) {
        importPath = path.join(filePath, '..', importPath);

        if (isComponentScript(importPath)) {
          const componentName = getComponentName(importPath);

          if (componentName !== name) {
            return componentName;
          }
        }
      }

      return '';
    })
    .filter(item => !!item);
}

function flatDeps(depsMap: Record<string, string[]>): string[] {
  const res: string[] = [];
  const names = Object.keys(depsMap);

  const add = (name: string) => {
    if (!res.includes(name)) {
      res.push(name);
    }
  };

  const flat = (name: string) => {
    const deps = depsMap[name];

    if (!deps.length) {
      add(name);
      return;
    }

    deps.forEach(flat);
    add(name);
  };

  names.forEach(flat);

  return res;
}

export function getDepsMap() {
  return depsMap;
}

export default function(options: Options = { cache: false }) {
  const { cache } = options;
  let firstFile: Vinyl;

  if (!cache) {
    depsMap = {};
  }

  return through2.obj(
    function(file: Vinyl, enc, cb) {
      if (file.isNull() || !file.contents) {
        return cb(null, file);
      }

      if (!firstFile) {
        firstFile = file.clone();
      }

      if (isComponentScript(file.path)) {
        // remove style import: import 'xxx.less'
        const code = removeStyleImport(file.contents.toString());
        file.contents = Buffer.from(code);
        this.push(file);

        if (!cache || !Object.keys(depsMap).length) {
          const name = getComponentName(file.path);
          const deps = (depsMap[name] || []).concat(
            getDeps(file.path, name, code)
          );
          depsMap[name] = [...new Set(deps)];
        }
      }

      cb();
    },
    function(cb) {
      // generate style/index.ts, style/raw.ts
      Object.keys(depsMap).forEach(name => {
        const deps = depsMap[name] || [];
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
      });

      // output json file: deps-map.json
      fs.outputJsonSync(
        DEPS_MAP_JSON_PATH,
        { ...depsMap, 'flat-deps': flatDeps(depsMap) },
        { spaces: 2 }
      );

      cb();
    }
  );
}
