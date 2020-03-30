// Modules
const gulp = require('gulp');

// File paths
const paths = {
	psd: {
		entry: './src/*.zip',
		dest: './prod/Template/Main files/'
	},
	docs: {
		entry: './src/_Instructions/**/*',
		dest: './prod/Template/_Instructions/',
	}
}


// Copy HTML
gulp.task('assets:prod-psd', () => {
	// Get font url
	return gulp.src(paths.psd.entry)
		.pipe(gulp.dest(paths.psd.dest))
});


// Copy images
gulp.task('assets:prod-docs', () => {
	return gulp.src(paths.docs.entry)
		.pipe(gulp.dest(paths.docs.dest))
});

// Default task
gulp.task('assets:prod', gulp.series('assets:prod-psd', 'assets:prod-docs'));