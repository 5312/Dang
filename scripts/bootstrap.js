const exec = require('child_process').exec;

const cmdStr = 'node ./scripts/bin/scripts.js';
// pnpm dlx create-umi@latest
exec(cmdStr, (err, stdout, stderr) => {
  if (err) {
    console.warn('启动失败', err);
  } else {
    console.warn('启动成功');
    console.warn(stdout);
    // console.warn(stderr);
  }
});
