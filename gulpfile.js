var gulp = require('gulp');
var connect = require('gulp-connect');
var minCSS = require('gulp-minify-css');
var minHTML = require('gulp-minify-html');
var ngMin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');

var paths = {
	build: './build/**/*',
	index: './app/index.html',
	copy: [
		'./img/loading-animation.gif'
		'./app/**/*.html',
		'!./app/index.html',
		'!./app/bower_components/**/*.html'
	]
};

gulp.task('clean', function(){
	gulp.src( paths.build, { read: false } )
		.pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
	gulp.src( paths.copy)
		.pipe( gulp.dest('./build'));
});

gulp.task('usemin', [ 'copy' ], function() {
	gulp.src( paths.index)
		.pipe( usemin({
			css: [ minCSS(), 'concat'],
			js: [ ngMin(), uglify()]
		}))
		.pipe( gulp.dest( './build/'));
});

gulp.task('build', ['usemin']);