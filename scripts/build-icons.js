const { toReact } = require('@toolman/icon-builder');
const ora = require('ora');

(async () => {
  const spinner = ora('build icons').start();

  try {
    await toReact({
      src: './src/icon/feather-icons/*.svg',
      out: './src/icon/',
      ts: true,
    });
  } catch (err) {
    spinner.fail();
  }

  spinner.succeed();
})();
