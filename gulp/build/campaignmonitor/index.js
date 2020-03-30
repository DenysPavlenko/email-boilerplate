// Modules
const gulp             = require('gulp');
const cleanAll         = require('gulp-clean');
const replace          = require('gulp-replace');
const inlineCss        = require('gulp-inline-css');
const inject           = require('gulp-inject-string');
const injectCSS        = require('gulp-inject-css');
const removeEmptyLines = require('gulp-remove-empty-lines');
const strip            = require('gulp-strip-comments');
const prettyHtml       = require('gulp-pretty-html');
const dom              = require('gulp-dom');
const fs               = require("fs");
const zip              = require('gulp-zip');


// Get constants
const CONSTANTS = require('../constants');
// Get functions
const campaignmonitorAttrs = require(`./dom`);
// File paths
const paths = {
	root: './dist/Campaignmonitor/',
	html: {
		entry: './app/index.html',
		dest : './dist/Campaignmonitor/'
	},
	images: {
		entry: './app/images/**/*',
		base: './app/images/',
		dest: './dist/Campaignmonitor/',
	},
}

// Clean folder
gulp.task('campaignmonitor:build-clean', () => {
	return gulp.src(paths.html.dest, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Build HTMl
gulp.task('campaignmonitor:build-html', () => {
	// Get font url
	const fontUrl = CONSTANTS.GET_FONT_URL(fs) || '';
	return gulp.src(paths.html.entry)
		// Remove all links
		.pipe(replace(CONSTANTS.REMOVE_ALL_SCRIPTS_REGX, ''))
		.pipe(replace(CONSTANTS.REMOVE_ALL_LINKS_REGX, ''))

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
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_CSS(CONSTANTS.RESET_LINK)))
		.pipe(injectCSS())

		// Add special tags and attributes
		.pipe(dom(function () {
			campaignmonitorAttrs(this.querySelector('body'), this);
			return this;
		}))

		// Change DOCTYPE
		.pipe(replace(CONSTANTS.FIND_DOCTYPE_REGX, CONSTANTS.SET_DOCTYPE))

		// Inject fonts
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_LINK(fontUrl)))
		.pipe(inject.after(`<style>`, CONSTANTS.INJECT_FONT_IMPORT(fontUrl)))

		// Remove comments
		.pipe(strip({ safe: true }))

		// Remove empty liness
		.pipe(removeEmptyLines())

		// Beautify
		.pipe(prettyHtml(CONSTANTS.PRETTIFY_HTML_OPTIONS))

		.pipe(gulp.dest(paths.html.dest))
});


// Copy images
gulp.task('campaignmonitor:build-images', () => {
	return gulp.src(paths.images.entry, { base: paths.images.base })
		.pipe(zip('images.zip'))
		.pipe(gulp.dest(paths.images.dest))
});

// Default task
gulp.task('cm', gulp.series('campaignmonitor:build-clean', 'campaignmonitor:build-html', 'campaignmonitor:build-images'));