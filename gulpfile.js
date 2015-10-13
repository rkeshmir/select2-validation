/**
 * Created by reza on 10/13/15.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
    rename = require("gulp-rename");

gulp.task('bower', function () {
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

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('dist', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});
