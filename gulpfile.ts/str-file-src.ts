import through2 from 'through2';
import Vinyl from 'vinyl';

export default function(name: string, content: string) {
  const stream = through2.obj(function(file: Vinyl, enc, cb) {
    return cb(null, file);
  });

  stream.write(
    new Vinyl({
      path: name,
      contents: Buffer.from(content),
    })
  );
  stream.end();

  return stream;
}
