var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var minCSS = require('gulp-minify-css');
var minHTML = require('gulp-minify-html');
var ngMin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

var paths = {
	build: './build/',
	index: './app/index.html',
	copy: [
		'./app/**/*.html',
		'!./app/index.html',
		'!./app/bower_components/**/*.html'
	]
};

gulp.task('clean', function() {
	gulp.src( paths.build, { read: false})
		.pipe( clean());
});

gulp.task('copy', function() {
	gulp.src( paths.copy)
		.pipe( gulp.dest('./build'));
});

gulp.task('usemin', function() {
	gulp.src( paths.index)
		.pipe( usemin({
			css: [ minCSS(), 'concat'],
			js: [ ngMin(), uglify()]
		}))
		.pipe( gulp.dest( paths.build));
});

gulp.task('build', ['clean', 'copy', 'usemin']);