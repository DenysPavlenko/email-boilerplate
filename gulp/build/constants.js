// config
const gulpConfig = require('../../gulp.config.js');

const inlineOptions = {
	applyLinkTags: true,
	removeLinkTags: true,
	removeStyleTags: true,
	removeHtmlSelectors: true,
	preserveMediaQueries: true,
	applyStyleTags: true,
}

module.exports = {
	// Links
	RESET_LINK     : 'styles/grid/reset.css',
	GRID_LINK      : 'styles/grid/grid.css',
	TYPOGRAPHY_LINK: 'styles/typography.css',
	EDITABLE_LINK  : 'styles/editable.css',

	// Inject
	INJECT_CSS        : (src) => `\n<!-- inject-css ${src} -->\n`,
	INJECT_LINK       : (url) => url ? `\n<link rel="stylesheet" href=${url}>\n`: '',
	INJECT_FONT_IMPORT: (url) => url ? `\n@import url(${url});\n`: '',

	// Inline options
	INLINE_OPTIONS: {
		...inlineOptions,
	},
	INLINE_GRID_OPTIONS: {
		...inlineOptions,
		applyLinkTags: false,
		removeLinkTags: false,
		removeHtmlSelectors: false,
	},

	// Fs functions
	GET_FONT_URL  : (fs) => {
		const getUrl = fs.readFileSync("./app/styles/typography.css", "utf8").match(/("http.*")/g)
		return getUrl ? getUrl[0] : false
	},
	GET_IMAGES_URL: () => gulpConfig.images,

	// REGEX
	REMOVE_ALL_LINKS_REGX       : /<link[^>]*>/g,
	REMOVE_ALL_SCRIPTS_REGX     : /<script[^>]*>/g,
	REMOVE_OUTLOOK_BG_START_REGX: /<!--\[if gte mso 9]>.*<!\[endif]-->/g,
	REMOVE_OUTLOOK_BG_END_REGX  : /<!--\[if gte mso 9]><\/v:textbox><\/v:rect><!\[endif]-->/g,
	FIND_DOCTYPE_REGX           : /<!DOCTYPE html>/g,
	SET_DOCTYPE                 : `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`,

	// Prettify options
	PRETTIFY_HTML_OPTIONS: {
		indent_size: 3,
		indent_char: ' ',
		unformatted: ['head', 'style', 'code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
	}
};