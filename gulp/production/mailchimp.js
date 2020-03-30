// Modules
const gulp     = require('gulp');
const cleanAll = require('gulp-clean');

// Files path
const paths = {
	root: './prod/Template/Main files/Mailchimp/',
	html: {
		entry: './dist/Mailchimp/index.html',
		dest: './prod/Template/Main files/Mailchimp/'
	}
}


// Clean folder
gulp.task('mailchimp:prod-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Copy HTML
gulp.task('mailchimp:prod-html', () => {
	// Get font url
	return gulp.src(paths.html.entry)
		.pipe(gulp.dest(paths.html.dest))
});

// Default task
gulp.task('mailchimp:prod', gulp.series('mailchimp:prod-clean', 'mailchimp:prod-html'));