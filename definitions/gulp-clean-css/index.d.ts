declare module 'gulp-clean-css' {
  import CleanCss from 'clean-css';

  interface Details
    extends Pick<
      CleanCss.Output,
      'stats' | 'errors' | 'warnings' | 'sourceMap'
    > {
    path: string;
    name: string;
  }

  interface GulpCleanCss {
    (
      options?: CleanCss.Options,
      callback?: (details: Details) => void
    ): NodeJS.ReadWriteStream;
  }

  const _out: GulpCleanCss;

  export = _out;
}
