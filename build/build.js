const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const { getEntry } = require('./utils')

const buildRoot = path.join(__dirname)
const projectRoot = path.join(buildRoot, '..')
const distRoot = path.join(projectRoot, '/dist')
/**
 * 开发中产出dist目录交给服务端使用 node build.js [site/map|spa1|all]  --watch
 * 构建生产环境 node build.js all --build
 */
const argv = require('minimist')(process.argv.slice(2));
let hasWatch = argv.watch ? '--watch' : ''
isBuild = argv.build ? `${buildRoot}/webpack.prod.js` : `${buildRoot}/webpack.dev.js`
fileName = argv._[0];
isHashName = argv.build ? '[name][hash]' : '[name]'
if (argv.build) {
    process.env.NODE_ENV = 'production'
}
if (fileName === 'all') {
    fs.readdirSync(`${projectRoot}/site`).forEach(file => {
        const blockFiles = ['.DS_Store', 'common', 'mpa']
        if (blockFiles.indexOf(file) === -1) {
            buildSPA(file)
        }
    });
    buildMPA()
    return false;
}
if (fileName === 'site/mpa') {
    buildMPA()
    return false;
}
buildSPA(fileName)

function buildMPA() {
    process.env.MPA = 'true'
    let ENTRY_FILESNAME = {};
    OUT_PUT_STR = `${distRoot}/mpa/${isHashName}.js --output-public-path=/fe-static/mpa/`;
    if (!fs.readdirSync(`${projectRoot}/site/mpa`)) {
        console.log('err:there is no such project。');
        return false;
    }
    fs.readdirSync(`${projectRoot}/site/mpa`).forEach(file => {
        const blockFiles = ['.DS_Store']
        if (blockFiles.indexOf(file) === -1) {
            ENTRY_FILESNAME[`${file}/index`] = (`${projectRoot}/site/mpa/${file}/index.tsx`);
        }
    });
    buildOne(getEntry(ENTRY_FILESNAME), OUT_PUT_STR);
}
function buildSPA(name) {
    let ENTRY_FILESNAME = {};
    let OUT_PUT_STR = `${distRoot}/${name}/${isHashName}.js --output-public-path=/fe-static/${name}/`;
    if (!fs.readdirSync(`${projectRoot}/site`).find(file => file === name)) {
        console.log(`err:${projectRoot}/site is no such project。`);
        return false;
    }
    ENTRY_FILESNAME[`index`] = (`${projectRoot}/site/${name}/index.tsx`);
    buildOne(getEntry(ENTRY_FILESNAME), OUT_PUT_STR);
}
function buildOne(ENTRY_FILESNAME_STR, OUT_PUT_STR) {
    const cpBuild = cp.exec(
        `npx webpack ${hasWatch} ${ENTRY_FILESNAME_STR} --config ${isBuild} -o ${OUT_PUT_STR}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error('error:', error);
            }
        }
    )
    cpBuild.stdout.on('data', (data) => {
        console.log('on stdout: ' + data);
    });
    cpBuild.stderr.on('on data', (data) => {
        if (data) {
            console.log('on stderr: ' + data);
        }
    });
}
