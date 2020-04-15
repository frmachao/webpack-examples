const cp = require('child_process');
const path = require('path');
/**
 * 注意webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中
 * 如果你想纯前端开发调试 node build.js 
 * 如果你想在开发中产出dist目录交给服务端使用 node build.js --build --watch
 * 构建生产环境 node build.js --build --prod
 */
const buildRoot=path.resolve(__dirname)
const argv = require('minimist')(process.argv.slice(2));
console.log('argv==',argv)
let isWatch = argv.watch ? '--watch' : ''
webpackMode = argv.prod ? `${buildRoot}/webpack.prod.js` : `${buildRoot}/webpack.dev.js`
isDevServer = argv.build ? 'webpack' : 'webpack-dev-server';

const cpBuild = cp.exec(`npx ${isDevServer} --config ${webpackMode} ${isWatch}`, (error, stdout, stderr) => {
    if (error) {
        console.error('error:', error);
    }
    if (stderr) {
        console.warn('stderr:', stderr);
    }
    console.log('stdout:', stdout);
})
cpBuild.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

cpBuild.stderr.on('data', function (data) {
    if (data) {
        console.log('stderr: ' + data);
    }
});