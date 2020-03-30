const vendors          = require('../../vendors');
const setEditableAttrs = require('./setEditableAttrs');
const mailchimpFooter  = require('./mailchimpFooter');


const { setAttrs, setUnsubscribe, removeDataAttrs } = vendors;

module.exports = (body) => {
	const children = Array.from(body.getElementsByTagName('*'));
	let secCnt = 1;
	let wrapperWidth;
	let widthSearch = true;

	// Set data module attributes to parent tables
	children.forEach((child) => {
		// Set section attributes
		if (child.parentNode === body) {
			let mcVariant;
			if (child.hasAttribute('data-module') && child.getAttribute('data-module') !== ''){
				mcVariant = child.getAttribute('data-module');
			} else {
				mcVariant = `section-s${secCnt}`;
				secCnt++;
			}
			setAttrs(child, {
				'mc:variant': mcVariant,
				'mc:hideable': true,
				'mc:repeatable': 'layout'
			});
			child.removeAttribute('data-module');
		}

		// Set wrapper width
		if (child.getAttribute('class') === 'wrapper' && widthSearch) {
			wrapperWidth = child.style.width;
			widthSearch = false;
		}
		// Set data attributes to inner tags
		setEditableAttrs(child);
		// Set unsubscribe link
		setUnsubscribe(child, '*|UNSUB|*');
		// Remove data attributes
		removeDataAttrs(child);

	});

	// Insert mailchimp footer
	body.innerHTML += mailchimpFooter(wrapperWidth);
}