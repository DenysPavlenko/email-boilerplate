const wrapTag = (elem, context, tagName) => {
	const wrapper = context.createElement(tagName);
	const tagText = elem.innerHTML;
	wrapper.innerHTML = tagText;
	elem.innerHTML = '';
	elem.appendChild(wrapper);
}

module.exports = (elem, _this) => {
	// Set multiline tags
	if (elem.style.fontFamily) {
		if (elem.children[0] && elem.children[0].hasAttribute('data-unsubscribe')) {
			wrapTag(elem, _this, 'unsubscribe');
			return;
		}
		wrapTag(elem, _this, 'multiline');
	}

	// Set editable tags to images
	if (elem.tagName === 'IMG') {
		elem.setAttribute('editable', 'true');
	}
}