var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('./app/js/**/*.js')
        .pipe(concat('custom.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './app/index.html'
    });
});

gulp.task('watch', function () {
    // Watch .html files
    gulp.watch('app/*.html', browserSync.reload);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['js']);
    // Watch .scss files
    gulp.watch('app/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);