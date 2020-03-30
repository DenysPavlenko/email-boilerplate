module.exports = (elem, tag) => {
	if (elem.tagName === tag) {
		let parent = elem.parentNode;
		while (elem.firstChild) {
			parent.insertBefore(elem.firstChild, elem);
		}
		parent.removeChild(elem);
	}
}