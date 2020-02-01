import through2 from 'through2';
import Vinyl from 'vinyl';
import { isComponentScript, removeStyleImport } from './utils';

export default function() {
  return through2.obj(function(file: Vinyl, enc, cb) {
    if (file.isNull() || !file.contents) {
      return cb(null, file);
    }

    if (isComponentScript(file.path)) {
      // remove style import: import 'xxx.less'
      const code = removeStyleImport(file.contents.toString());
      file.contents = Buffer.from(code);
      this.push(file);
      cb();
    } else {
      cb(null, file);
    }
  });
}
