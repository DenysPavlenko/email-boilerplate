// Modules
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const notify      = require('gulp-notify');
const plumber     = require('gulp-plumber');
const pug         = require("gulp-pug");
const prettyHtml  = require('gulp-pretty-html');


// File paths
const paths = {
	root: './app',
	pug: {
		entry: 'app/index.pug',
		watch: ['app/index.pug', 'app/pug/**/*.pug'],
		dest: './app/'
	},
	scss: {
		entry: './app/scss/**/*.scss',
		dest: './app/styles/',
	},
}

// browser sync
gulp.task('pug-dev:browser-sync', (done) => {
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

// Pug
gulp.task('pug-dev:pug', () => {
	return gulp.src(paths.pug.entry)
		.pipe(plumber())
		.pipe(pug())
		.pipe(prettyHtml({
			indent_size: 3,
			indent_char: '	',
		}))
		.pipe(gulp.dest(paths.pug.dest))
		.pipe(browserSync.reload({ stream: true }))
});

// Sass
gulp.task('pug-dev:sass', () => {
	return gulp.src(paths.scss.entry)
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(gulp.dest(paths.scss.dest))
		.pipe(browserSync.reload({ stream: true }));
});

// Watch
gulp.task('pug-dev:watch', (done) => {
	gulp.watch(paths.pug.watch, gulp.parallel('pug-dev:pug'));
	gulp.watch(paths.scss.entry, gulp.parallel('pug-dev:sass'));
	done();
});

// Gulp default
gulp.task('pug-dev', gulp.series('pug-dev:pug', 'pug-dev:sass', 'pug-dev:watch', 'pug-dev:browser-sync'));