const gulp = require('gulp');
const babel = require("gulp-babel");
const less = require('gulp-less')
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');// css 自动加前缀
const cssnano = require('gulp-cssnano');// 压缩css
const imagemin = require('gulp-imagemin');// Minify PNG, JPEG, GIF and SVG images
const nodemon = require('gulp-nodemon')

const paths = {
    build: 'dist',
    server: 'dist/**/*.js',
    css: 'dist/**/*.css',
    images: ['src/public/images/**/*'],
    js: ['src/public/js/**/*.js'],
    ts: 'src/**/*.ts',
    less: 'src/**/*.less',
};
function clean() {
    return del(paths.build);
}
function buildTS() {
    return gulp.src(paths.ts)
        .pipe(babel())
        .pipe(gulp.dest(paths.build));
}
function buildLess() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(paths.build));
}
function minCSS() {
    return gulp.src(paths.css)
        .pipe(cssnano())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest(paths.build));
}
function buildImage() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.build + '/public/images'))
}
function minImage() {
    return gulp.src('dist/public/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.build + '/public/images'))

}
function buildJS() {
    return gulp.src(paths.js)
        .pipe(gulp.dest(paths.build + '/public/js'))
}
/**
 * 启动 node 服务
 */
function server(done) {
    const stream = nodemon({
        "ignore": [
            "node_modules"
        ],
        "watch": [
            "dist"
        ],
        "script": "dist/app.js",
        "ext": "js",
        done: done
    })
    stream
        .on('crash', function () {
            console.error('Application has crashed!\n restart the server in 10 seconds')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        })
}
function watch() {
    gulp.watch(paths.ts, buildTS)
    gulp.watch(paths.less, buildLess)
    gulp.watch(paths.images, buildImage)
    gulp.watch(paths.js, buildJS)
}
gulp.task('min', gulp.parallel(minCSS, minImage))
gulp.task('build-dev', gulp.parallel(buildTS, buildLess, buildImage, buildJS))
gulp.task('prod', gulp.series(clean, 'build-dev', 'min'))
gulp.task('default', gulp.series(clean, 'build-dev', server))
exports.clean = clean
exports.watch = watch
