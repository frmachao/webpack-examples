const cp = require('child_process');

cp.exec(`npx webpack --config build/webpack.config.js`, (error, stdout, stderr) => {
    if (error) {
        console.error('error:', error);
    }
    if (stderr) {
        console.warn('stderr:', stderr);
    }
    console.log('stdout:', stdout);
})