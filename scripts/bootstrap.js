//  create package.json, README, etc. for packages that don't have them yet
// 调用bin
/* const exec = require('child_process').exec;

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
 */

const fs = require('fs');
const path = require('path');
const version = require('../package.json').version;

// package 下的项目目录
const packagesDir = path.resolve(__dirname, '../packages');
const files = fs.readdirSync(packagesDir);

files.forEach((shortName) => {
  if (!fs.statSync(path.join(packagesDir, shortName)).isDirectory()) {
    console.log(shortName, '不是目录');
    return;
  }
  // package.josn 的name
  const name = shortName === `dang` ? shortName : `@dang/${shortName}`;
  const pkgPath = path.join(packagesDir, shortName, `package.json`);
  // 是否存在 package.json
  const pkgExists = fs.existsSync(pkgPath);
  if (pkgExists) {
    const pkg = require(pkgPath);
    if (pkg.private) {
      return;
    }
  }
  // 不存在开始创建
});
