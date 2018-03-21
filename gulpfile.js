var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    styleCss = require('gulp-less');

var base_url = './src/client/kanban/',
    paths = {
        index: base_url + 'index.html',
        dest: './dist/client/',
        less_style: 'assets/styles/*.less',
        style_dest: base_url + 'style_css'

    };

gulp.task('default', function() {
    console.log("Not implemented yet.")
});

gulp.task('inject-dependencies', injectFiles)

gulp.task('gulp-less', injectLess);

/**
 * @function injectFiles
 * @description Inject all the dependencies into index.html
 */
function injectFiles() {
    injectBowerFiles();
}

/**
 * @function injectLess
 * @description Inject all the dependencies into css
 */
function injectLess() {
    injectStyleLess();
}

/**
 * @function injectBowerFiles
 * @description 
 */
function injectBowerFiles() {
    gulp.src(paths.index)
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest(paths.dest));
}

/**
 * @function injectStyleLess
 * @description 
 */
function injectStyleLess() {
    gulp.src(paths.less_style)
        .pipe(inject(gulp.src(styleCss(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest(paths.style_dest));
}