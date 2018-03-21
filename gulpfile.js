var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject');

var base_url = './src/client/kanban/',
    paths = {
        index: base_url + 'index.html',
        dest: './dist/client/'
    };

gulp.task('default', function() {
    console.log("Not implemented yet.")
});

gulp.task('inject-dependencies', injectFiles)

/**
 * @function injectFiles
 * @description Inject all the dependencies into index.html
 */
function injectFiles() {
    injectBowerFiles();
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