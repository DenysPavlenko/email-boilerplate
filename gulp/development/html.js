// Modules
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const notify      = require('gulp-notify');
const plumber     = require('gulp-plumber');


// File paths
const paths = {
	root: './app',
	html: {
		entry: 'app/index.html',
	},
	scss: {
		entry: './app/scss/**/*.scss',
		dest: './app/styles/',
	},
}

// browser sync
gulp.task('html-dev:browser-sync', (done) => {
	browserSync({
		server: { baseDir: paths.root },
		ghostMode: { scroll: true },
		notify: false,
		scroll: true,
		open: false,
		tunnel: false,
	});
	done();
});

// Html
gulp.task('html-dev:html', () => {
	return gulp.src(paths.html.entry)
		.pipe(browserSync.reload({ stream: true }))
});

// Sass
gulp.task('html-dev:sass', () => {
	return gulp.src(paths.scss.entry)
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(gulp.dest(paths.scss.dest))
		.pipe(browserSync.reload({ stream: true }));
});

// Watch
gulp.task('html-dev:watch', (done) => {
	gulp.watch(paths.html.entry, gulp.parallel('html-dev:html'));
	gulp.watch(paths.scss.entry, gulp.parallel('html-dev:sass'));
	done();
});

// Gulp default
gulp.task('html-dev', gulp.series('html-dev:html', 'html-dev:sass', 'html-dev:watch', 'html-dev:browser-sync'));