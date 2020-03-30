// Modules
const gulp     = require('gulp');
const cleanAll = require('gulp-clean');
const del      = require('del');
const zip      = require('gulp-zip');
const jimp     = require('gulp-jimp');
const gulpif   = require('gulp-if');


// Files path
const paths = {
	root: './prod/Template/Main files/Stampready/',
	html: {
		entry: './dist/Stampready/index.html',
		dest: './prod/Template/Main files/Stampready/Template/'
	},
	images: {
		entry: './app/images/**/*',
		dest: './prod/Template/Main files/Stampready/Template/images/'
	},
	thumbs: {
		entry: './src/thumbnails/**/*',
		dest: './prod/Template/Main files/Stampready/Template/thumbnails/',
	},
	zip: {
		entry: './prod/Template/Main files/Stampready/Template/**/*',
		remove: './prod/Template/Main files/StampReady/Template',
		dest: './prod/Template/Main files/Stampready/',
	},
}


// Clean folder
gulp.task('stampready:prod-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Copy HTML
gulp.task('stampready:prod-html', () => {
	// Get font url
	return gulp.src(paths.html.entry)
		.pipe(gulp.dest(paths.html.dest))
});

// Copy images
gulp.task('stampready:prod-images', () => {
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

// Copy thumbnails
gulp.task('stampready:prod-thumbnails', () => {
	return gulp.src(paths.thumbs.entry)
		.pipe(gulp.dest(paths.thumbs.dest))
});

// Zip stampready folder
gulp.task('stampready:prod-zip', () => {
	return gulp.src(paths.zip.entry, { base: paths.zip.dest })
		.pipe(zip('Template.zip'))
		.pipe(gulp.dest(paths.zip.dest))
});

// Remove stamapready Template folder after zipping
gulp.task('stampready:prod-remove', () => {
	return del(paths.zip.remove);
});

// Default task
gulp.task('stampready:prod', gulp.series('stampready:prod-clean', 'stampready:prod-html', 'stampready:prod-images', 'stampready:prod-thumbnails', 'stampready:prod-zip', 'stampready:prod-remove'));