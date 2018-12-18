var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './assets/css/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());;
});

gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', './assets/js/*'])
		.pipe(gulp.dest('./assets/js'))
		.pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src('./assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/img'));
});

gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './assets/css/sass/**/*.scss'], gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('imagemin', 'js', 'serve'));