import through2 from 'through2';
import Vinyl from 'vinyl';
import path from 'path';
import { isComponentScript, getComponentName } from './utils';
import { IMPORT_RE } from './constants';

let depsMap: Record<string, string[]> = {};

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

export default function() {
  depsMap = {};

  return through2.obj(
    function(file: Vinyl, enc, cb) {
      if (file.isNull() || !file.contents) {
        return cb();
      }

      if (isComponentScript(file.path)) {
        const name = getComponentName(file.path);
        const deps = (depsMap[name] || []).concat(
          getDeps(file.path, name, file.contents.toString())
        );
        depsMap[name] = [...new Set(deps)];
      }

      cb();
    },
    function(cb) {
      // output json file: deps-map.json
      const json = JSON.stringify(
        { ...depsMap, 'flat-deps': flatDeps(depsMap) },
        null,
        2
      );
      this.push(
        new Vinyl({
          path: 'deps-map.json',
          contents: Buffer.from(json),
        })
      );

      cb();
    }
  );
}
