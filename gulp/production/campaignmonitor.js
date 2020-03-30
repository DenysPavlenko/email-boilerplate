// Modules
const gulp     = require('gulp');
const cleanAll = require('gulp-clean');
const del      = require('del');
const zip      = require('gulp-zip');
const jimp     = require('gulp-jimp');
const gulpif   = require('gulp-if');


// Files path
const paths = {
	root: './prod/Template/Main files/Campaignmonitor/',
	html: {
		entry: './dist/Campaignmonitor/index.html',
		dest: './prod/Template/Main files/Campaignmonitor/'
	},
	images: {
		entry: './app/images/**/*',
		dest: './prod/Template/Main files/Campaignmonitor/images/',
	},
	zip: {
		entry: './prod/Template/Main files/Campaignmonitor/images/**/*',
		remove: './prod/Template/Main files/Campaignmonitor/images',
		dest: './prod/Template/Main files/Campaignmonitor/',
	},
}


// Clean folder
gulp.task('campaignmonitor:prod-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Copy HTML
gulp.task('campaignmonitor:prod-html', () => {
	// Get font url
	return gulp.src(paths.html.entry)
		.pipe(gulp.dest(paths.html.dest))
});

// Copy images
gulp.task('campaignmonitor:prod-images', () => {
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

// Zip images
gulp.task('campaignmonitor:prod-zip', () => {
	return gulp.src(paths.zip.entry, { base: paths.zip.dest })
		.pipe(zip('images.zip'))
		.pipe(gulp.dest(paths.zip.dest))
});

// Remove images folder after zipping
gulp.task('campaignmonitor:prod-remove', () => {
	return del(paths.zip.remove);
});



// Default task
gulp.task('campaignmonitor:prod', gulp.series('campaignmonitor:prod-clean', 'campaignmonitor:prod-html', 'campaignmonitor:prod-images', 'campaignmonitor:prod-zip', 'campaignmonitor:prod-remove'));