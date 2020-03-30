// Modules
const gulp             = require('gulp');
const cleanAll         = require('gulp-clean');
const replace          = require('gulp-replace');
const inlineCss        = require('gulp-inline-css');
const prettyHtml       = require('gulp-pretty-html');
const inject           = require('gulp-inject-string');
const injectCSS        = require('gulp-inject-css');
const removeEmptyLines = require('gulp-remove-empty-lines');
const dom              = require('gulp-dom');
const fs               = require("fs");


// Get constants
const CONSTANTS = require('../constants');
// Get functions
const htmlAttrs = require(`./dom`);

// File paths
const paths = {
	root: './dist/Html/',
	html: {
		entry: './app/index.html',
		dest: './dist/Html/'
	},
	images: {
		entry: './app/images/**/*',
		dest: './dist/Html/images/',
	},
}


// Clean folder
gulp.task('html:build-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Build HTMl
gulp.task('html:build-html', () => {
	// Get font url
	const fontUrl = CONSTANTS.GET_FONT_URL(fs) || '';
	return gulp.src(paths.html.entry)
		// Remove all links
		.pipe(replace(CONSTANTS.REMOVE_ALL_SCRIPTS_REGX, ''))
		.pipe(replace(CONSTANTS.REMOVE_ALL_LINKS_REGX, ''))

		// Remove all data attributes
		.pipe(dom(function () {
			htmlAttrs(this.querySelector('body'));
			return this;
		}))

		// Change DOCTYPE
		.pipe(replace(CONSTANTS.FIND_DOCTYPE_REGX, CONSTANTS.SET_DOCTYPE))

		// Inline typography and editable styles
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_LINK(CONSTANTS.TYPOGRAPHY_LINK)))
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_LINK(CONSTANTS.EDITABLE_LINK)))
		.pipe(inlineCss(CONSTANTS.INLINE_OPTIONS))
		.pipe(replace(`../`, ''))

		// Inline grid
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_CSS(CONSTANTS.GRID_LINK)))
		.pipe(injectCSS())
		.pipe(inlineCss(CONSTANTS.INLINE_GRID_OPTIONS))

		// Inject reset styles
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_CSS(CONSTANTS.RESET_LINK) ))
		.pipe(injectCSS())

		// Inject fonts
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_LINK(fontUrl)))
		.pipe(inject.after(`<style>`, CONSTANTS.INJECT_FONT_IMPORT(fontUrl)))

		// Remove empty liness
		.pipe(removeEmptyLines())
		// Beautify
		.pipe(prettyHtml(CONSTANTS.PRETTIFY_HTML_OPTIONS))

		.pipe(gulp.dest(paths.html.dest))

});

// Copy images
gulp.task('html:build-images', () => {
	return gulp.src(paths.images.entry)
		.pipe(gulp.dest(paths.images.dest))
});

// Default task
gulp.task('html', gulp.series('html:build-clean', 'html:build-html', 'html:build-images'));