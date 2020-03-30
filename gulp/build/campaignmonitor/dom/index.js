const vendors             = require('../../vendors');
const setEditableElements = require('./setEditableElements');

const { removeDataAttrs, removeTag, imageWidth } = vendors;

module.exports = (body, _this) => {
	const sections = Array.from(body.children);

	// Wrap sections by layout tag, except for unsubscribe section
	let secCnt = 1;
	sections.forEach((section)=>{
		// Create layout tag
		const layout = _this.createElement('layout');
		let secName;
		if(section.hasAttribute('data-module') && section.getAttribute('data-module') !== ''){
			secName = section.getAttribute('data-module');
		} else {
			secName = `section-${secCnt}`;
			secCnt++;
		}
		layout.setAttribute('label', secName);
		// Skip unsubscribe section
		children = Array.from(section.getElementsByTagName('*'));
		const hasUnsub = children.some((child) => {
			const hasAttr = child.hasAttribute('data-unsubscribe');
			// set editable attributes and multiline tags
			setEditableElements(child, _this);
			// set fixed width to images
			imageWidth(child);

			return hasAttr;
		});

		// Wrap sections by layout tag
		if (!hasUnsub) {
			section.parentNode.insertBefore(layout, section);
			layout.appendChild(section);
		}
	});

	// Wrap layout sections by repeater tag, break on unsubscribe section
	// Add second repeater after unsubscribe section
	const layoutSections = Array.from(body.children);
	const firstRepeater  = _this.createElement('repeater');
	const secondRepeater = _this.createElement('repeater');
	body.insertBefore(firstRepeater, layoutSections[0]);

	for (let i = 0; i < layoutSections.length; i++) {
		if (layoutSections[i].tagName === 'LAYOUT'){
			firstRepeater.appendChild(layoutSections[i]);
		}
		else if (layoutSections[i].tagName !== 'LAYOUT' && layoutSections[i] === layoutSections[layoutSections.length-1]){
			break;
		}
		else {
			body.insertBefore(secondRepeater, layoutSections[i+1]);
			break;
		}
	}

	// Wrap layout sections by repeater tag after unsubscribe section
	const layoutSectionsAfter = Array.from(body.children);
	layoutSectionsAfter.forEach((section)=>{
		if (section.tagName === 'LAYOUT'){
			secondRepeater.appendChild(section);
		}
	});


	// Remove all links and data-attributes
	const allChilds = Array.from(body.getElementsByTagName('*'));
	allChilds.forEach((child)=>{
		// Remove links
		removeTag(child, 'A');
		// Remove data attributes
		removeDataAttrs(child);
	});
};