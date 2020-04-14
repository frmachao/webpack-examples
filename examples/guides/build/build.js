const cp = require('child_process');

// node index.js --beep=boop -t -z 12 -n5 foo bar
// { _: [ 'foo', 'bar' ], beep: 'boop', t: true, z: 12, n: 5 }
const argv = require('minimist')(process.argv.slice(2));
let isWatch =argv.watch?'--watch':''
    webpackMode=argv.build?"webpack.prod.js":"webpack.dev.js"
if(argv.build&&argv.watch){
    console.log('err: build 和 watch 不能同时执行');
    return false;
}
// 注意webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中
const cpBuild = cp.exec(`npx webpack --config build/${webpackMode} ${isWatch}`, (error, stdout, stderr) => {
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