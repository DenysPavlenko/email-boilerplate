const vendors          = require('../../vendors');
const setEditableAttrs = require('./set-editable-attributes');


const { setUnsubscribe } = vendors;

module.exports = (body) => {
	const children = Array.from(body.getElementsByTagName('*'));
	let secCnt = 1;

	// Set data module attributes to parent tables
	children.forEach((child) => {
		// Set section attributes
		if (child.parentNode === body) {
			if (child.hasAttribute('data-module') && child.getAttribute('data-module') !== ''){
				const dataModule = child.getAttribute('data-module');
				child.setAttribute('data-thumb', `thumbnails/${dataModule}.jpg`);
				return;
			}
			if (!child.hasAttribute('data-module') || child.getAttribute('data-module') === ''){
				child.setAttribute('data-module', `s${secCnt}`);
			}
			if (!child.hasAttribute('data-thumb') || child.getAttribute('data-thumb') === ''){
				child.setAttribute('data-thumb', `thumbnails/s${secCnt}.jpg`);
			}
			secCnt++;
		}

		// Set data attributes to inner tags
		setEditableAttrs(child);
		// Set unsubscribe link
		setUnsubscribe(child, 'sr_unsubscribe');

	});
}
