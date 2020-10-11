const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('gulp4-run-sequence');
const sass = require('gulp-sass');

gulp.task('normalCss',()=>{
    return gulp.src('assets/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('assets'))
    .pipe(browserSync.stream());;
});

gulp.task('html',(done) => {
    gulp.src('./**/*.html')
    .pipe(browserSync.stream());
    done();
})
gulp.task('watch',() => {
    gulp.watch('assets/**/*.scss',gulp.series('normalCss'))
    gulp.watch('./**/*.html',gulp.series('html'))
});
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default',(done) =>{
    runSequence(['html','normalCss','browser-sync','watch']);
    done();
 });
