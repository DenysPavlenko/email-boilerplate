const vendors = require('../../vendors');

const { removeDataAttrs, removeTag } = vendors;

module.exports = (body) => {
	const children = Array.from(body.getElementsByTagName('*'));
	// Loop through all child elements
	children.forEach((child) => {
		// Remove data attributes from child attrs
		removeDataAttrs(child);
		// Remove tbody tags
		removeTag(child, 'TBODY');
	})
};