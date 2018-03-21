var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify')
    rename = require("gulp-rename");
    styleCss = require('gulp-less');

var base_url = './src/client/kanban/',
    dest_url = './dist/client/',
    paths = {
        index: base_url + 'index.html',
        scripts_origin: base_url + '**/*.js',
        scripts_spec: base_url + '**/*.spec.js',
        dest: './dist/client/',
        scripts_dest: dest_url + 'js/',
        dev_enviroment: 'dev',
        prod_enviroment: 'prod',
        less_style: 'assets/styles/*.less',
        style_dest: base_url + 'style_css'
    };

gulp.task('build-dev', function() {
    injectDevFiles();
});

gulp.task('build-prod', function() {
    generateFiles(paths.prod_enviroment);
    injectProdFiles();
});

gulp.task('inject-dev-dependencies', injectDevFiles);
gulp.task('generate-files-dev', generateFiles);

/**
 * @function generateFiles
 * @description Generate all the files what will be injected to index.html
 */
function generateFiles(enviroment) {
    enviroment = enviroment === paths.prod_enviroment;
    generateScript(enviroment);
    generateBowerScript(enviroment);
}

/**
 * @function generateScript
 * @description Concat and generate one script to be injected into index.html
 */
function generateScript(isProdEnviroment) {
    return gulp.src(paths.scripts_origin)
        .pipe(concat('index.js'))
        .pipe(gulp.dest(paths.scripts_dest))
        .pipe(gulpif(isProdEnviroment, uglify()))
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest(paths.scripts_dest));
}

/**
 * @function generateBowerScript
 * @description Concat and generate one script from bower js to be injected into index.html
 */
function generateBowerScript(isProdEnviroment) {
    return gulp.src(bowerFiles())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(paths.scripts_dest))
        .pipe(gulpif(isProdEnviroment, uglify()))
        .pipe(rename('bower.min.js'))
        .pipe(gulp.dest(paths.scripts_dest));
}

gulp.task('gulp-less', injectLess);

/**
 * @function injectFiles
 * @description Inject all bower dependencies into index.html
 */
function injectDevFiles() {
    return gulp.src(paths.index)
        //Inject bower files
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        //inject own files and exclude spec files
        .pipe(inject(gulp.src([paths.scripts_origin, '!' + paths.scripts_spec], {read: false})))
        .pipe(gulp.dest(dest_url));
}

/**
 * @function injectProdFiles
 * @description 
 */
function injectProdFiles() {

}

/* 
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