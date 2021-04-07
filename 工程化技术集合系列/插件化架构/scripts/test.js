// https://zhuanlan.zhihu.com/p/67613842

const minimist = require('minimist');
const rawArgs = process.argv.slice(2);
// const args = minimist(rawArgs);
const path = require('path');
let rootDir = path.resolve(__dirname, '../');
// 指定包测试
if (rawArgs[0]) {
  rootDir = rootDir + '/packages/' + rawArgs[0]
}
const jestArgs = [
  '--runInBand',
  '--rootDir', rootDir
]

console.log(`\n===> running: jest ${jestArgs.join(' ')}`);

require('jest').run(jestArgs);