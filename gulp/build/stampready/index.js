// Modules
const gulp             = require('gulp');
const cleanAll         = require('gulp-clean');
const dom              = require('gulp-dom');
const replace          = require('gulp-replace');
const inlineCss        = require('gulp-inline-css');
const inject           = require('gulp-inject-string');
const injectCSS        = require('gulp-inject-css');
const removeEmptyLines = require('gulp-remove-empty-lines');
const strip            = require('gulp-strip-comments');
const prettyHtml       = require('gulp-pretty-html');
const fs               = require("fs");


// Get constants
const CONSTANTS = require('../constants');
// Get dom function
const DOM = require(`./dom`);
// File paths
const paths = {
	root: './dist/Stampready/',
	html: {
		entry: './app/index.html',
		dest: './dist/Stampready/'
	},
	images: {
		entry: './app/images/**/*',
		dest: './dist/Stampready/images/',
	},
	thumbs: {
		entry: './src/thumbnails/**/*',
		dest: './dist/Stampready/thumbnails/',
	},
}


// Clean folder
gulp.task('stampready:build-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Build HTMl
gulp.task('stampready:build-html', () => {
	// Get font url
	const fontUrl = CONSTANTS.GET_FONT_URL(fs) || '';
	return gulp.src(paths.html.entry)
		// Remove all links and scripts
		.pipe(replace(CONSTANTS.REMOVE_ALL_SCRIPTS_REGX, ''))
		.pipe(replace(CONSTANTS.REMOVE_ALL_LINKS_REGX, ''))

		// Inline typography and editable styles
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_LINK(CONSTANTS.TYPOGRAPHY_LINK)))
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_LINK(CONSTANTS.EDITABLE_LINK)))
		.pipe(inlineCss({ ...CONSTANTS.INLINE_OPTIONS, removeHtmlSelectors: false }))
		.pipe(replace(`../`, ''))

		// Add special attributes
		.pipe(dom(function () {
			DOM(this.querySelector('body'));
			return this;
		}))

		// Change DOCTYPE
		.pipe(replace(CONSTANTS.FIND_DOCTYPE_REGX, CONSTANTS.SET_DOCTYPE))

		// Inline grid
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_CSS(CONSTANTS.GRID_LINK)))
		.pipe(injectCSS())
		.pipe(inlineCss(CONSTANTS.INLINE_GRID_OPTIONS))

		// Inject reset styles
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_CSS(CONSTANTS.RESET_LINK)))
		.pipe(injectCSS())

		// Inject fonts
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_LINK(fontUrl)))
		.pipe(inject.after(`<style>`, CONSTANTS.INJECT_FONT_IMPORT(fontUrl)))

		// Replace special outlook background tags
		.pipe(replace(CONSTANTS.REMOVE_OUTLOOK_BG_START_REGX, ''))
		.pipe(replace(CONSTANTS.REMOVE_OUTLOOK_BG_END_REGX, ''))

		// Remove comments
		.pipe(strip({ safe: true }))

		// Remove empty liness
		.pipe(removeEmptyLines())

		// Beautify
		.pipe(prettyHtml(CONSTANTS.PRETTIFY_HTML_OPTIONS))

		.pipe(gulp.dest(paths.html.dest))
});


// Copy images
gulp.task('stampready:build-images', () => {
	return gulp.src(paths.images.entry)
		.pipe(gulp.dest(paths.images.dest))
});

// Copy Thumbnails
gulp.task('stampready:build-thumbnails', () => {
	return gulp.src(paths.thumbs.entry)
		.pipe(gulp.dest(paths.thumbs.dest))
});


// Default task
gulp.task('sr', gulp.series('stampready:build-clean', 'stampready:build-html', 'stampready:build-images', 'stampready:build-thumbnails'));