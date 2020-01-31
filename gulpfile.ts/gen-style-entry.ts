import through2 from 'through2';
import Vinyl from 'vinyl';
import fs from 'fs-extra';
import path from 'path';
import { SRC_PATH } from './constants';

export default function() {
  return through2.obj(function(file: Vinyl, enc, cb) {
    if (file.isNull() || !file.contents) {
      return cb();
    }

    const flatDeps: string[] = JSON.parse(file.contents.toString())[
      'flat-deps'
    ];
    const styleImports = flatDeps
      .map(dep => {
        if (fs.existsSync(path.join(SRC_PATH, dep, 'index.less'))) {
          return `@import './${dep}/index.less';`;
        }
        return '';
      })
      .filter(item => !!item);

    this.push(
      new Vinyl({
        path: 'index.less',
        contents: Buffer.from(styleImports.join('\n')),
      })
    );

    cb();
  });
}
