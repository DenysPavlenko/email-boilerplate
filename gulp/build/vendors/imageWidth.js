const sizeOf = require('image-size');

/* Add width for image*/
module.exports = (elem) => {
	if (elem.tagName === 'IMG' && elem.getAttribute('alt') !== 'timer') {
		const src = `app/${elem.getAttribute('src')}` ;
		const dimension = sizeOf(src);
		elem.setAttribute('width', dimension.width)
	}
}