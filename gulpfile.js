var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './app/index.html'
    });
});

gulp.task('watch', function() {
    // Watch .html files
    gulp.watch('app/*.html', browserSync.reload);
    // Watch .scss files
    gulp.watch('app/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);