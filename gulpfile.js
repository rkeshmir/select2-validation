/**
 * Created by reza on 10/13/15.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    mainBowerFiles = require('gulp-main-bower-files'),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    rename = require("gulp-rename");


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('bower', ['clean'], function () {
    return gulp.src('./bower.json') //  read all bower files
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/**/*.min.*',
                        './dist/fonts/*'
                    ]
                }  //  consider these files for bootstrap
            }
        })) //  select main files
        .pipe(gulp.dest('./dist/bower_components')); //  copy concatenated file to destination
});

gulp.task('html', ['bower'], function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['html'], function () {
    var target = gulp.src('./dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var jQueryStream = gulp.src(['dist/bower_components/jquery/dist/jquery.js'], {read: false}, {relative: true});

    var vendorStream = gulp.src(['dist/**/*.js','dist/**/*.css','!dist/bower_components/jquery/dist/jquery.js'], {read: false}, {relative: true});


    return target.pipe(inject(series(jQueryStream, vendorStream) , {relative: true}))
        .pipe(gulp.dest('./dist'));
});