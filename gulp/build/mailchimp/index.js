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
const cssVip           = require("gulp-css-vip");
const fs               = require("fs");

// Get constants
const CONSTANTS = require('../constants');
// Get functions
const MAILCHIMP_ATTRS = require(`./dom`);
// File paths
const paths = {
	root: './dist/Mailchimp/',
	html: {
		entry: './app/index.html',
		dest: './dist/Mailchimp/'
	},
	css: {
		entry: './app/styles/editable.css',
		remove: 'dist/Mailchimp/editable.css',
		dest: './dist/Mailchimp/'
	}
}


// Clean folder
gulp.task('mailchimp:build-clean', () => {
	return gulp.src(paths.root, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Build css
gulp.task('mailchimp:build-css', ()=> {
	return gulp.src(paths.css.entry)
		.pipe(cssVip())
		.pipe(gulp.dest(paths.css.dest))
});

// Build HTMl
gulp.task('mailchimp:build-html', ()=> {
	// Get fonts and images urls
	const fontUrl = CONSTANTS.GET_FONT_URL(fs) || '';
	const imagesUrl = CONSTANTS.GET_IMAGES_URL();

	return gulp.src(paths.html.entry)
		// Remove all links
		.pipe(replace(CONSTANTS.REMOVE_ALL_SCRIPTS_REGX, ''))
		.pipe(replace(CONSTANTS.REMOVE_ALL_LINKS_REGX, ''))

		// Inline typography and editable styles
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_LINK(CONSTANTS.TYPOGRAPHY_LINK)))
		.pipe(inlineCss(CONSTANTS.INLINE_OPTIONS))

		// Inline grid
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_CSS(CONSTANTS.GRID_LINK)))
		.pipe(injectCSS())
		.pipe(inlineCss(CONSTANTS.INLINE_GRID_OPTIONS))

		// Inject reset styles
		.pipe(inject.after(`</title>`, CONSTANTS.INJECT_CSS(CONSTANTS.RESET_LINK)))
		.pipe(injectCSS())

		// Editable styles
		.pipe(inject.before(`</head>`, CONSTANTS.INJECT_CSS('../dist/Mailchimp/editable.css')))
		.pipe(injectCSS())
		// Replace absolute paths
		.pipe(replace(`../`, ''))
		// Add image links
		.pipe(replace(`images/`, imagesUrl))

		// Add special attributes
		.pipe(dom(function () {
			MAILCHIMP_ATTRS(this.querySelector('body'));
			return this;
		}))

		// Change DOCTYPE
		.pipe(replace(CONSTANTS.FIND_DOCTYPE_REGX, CONSTANTS.SET_DOCTYPE))

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

// Remove css file
gulp.task('mailchimp:build-remove-css', () => {
	return gulp.src(paths.css.remove, { read: false, allowEmpty: true })
		.pipe(cleanAll())
});

// Default task
gulp.task('mc', gulp.series('mailchimp:build-clean', 'mailchimp:build-css', 'mailchimp:build-html', 'mailchimp:build-remove-css'));