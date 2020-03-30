// Modules
const gulp     = require('gulp');
const cleanAll = require('gulp-clean');
const jimp     = require('gulp-jimp');
const gulpif   = require('gulp-if');


// Files path
const paths = {
	root: './prod/Template/Main files/Html/',
	html: {
		entry: './dist/Html/index.html',
		dest: './prod/Template/Main files/Html/'
	},
	images: {
		entry: './app/images/**/*',
		dest: './prod/Template/Main files/Html/images/',
	}
}


// Clean folder
gulp.task('html:prod-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Copy HTML
gulp.task('html:prod-html', () => {
	// Get font url
	return gulp.src(paths.html.entry)
		.pipe(gulp.dest(paths.html.dest))
});


// Copy images
gulp.task('html:prod-images', () => {
	return gulp.src(paths.images.entry)
		.pipe(gulpif((file)=>{
			return /\.jpg/.test(file['history'][0])
		},
			jimp({
				'': {
					blur: 20
				}
			})
		))
		.pipe(gulp.dest(paths.images.dest))
});

// Default task
gulp.task('html:prod', gulp.series('html:prod-clean', 'html:prod-html', 'html:prod-images'));