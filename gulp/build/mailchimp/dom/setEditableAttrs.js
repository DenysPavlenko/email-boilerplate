let mcEditId = 0;
module.exports = (elem) => {
	if (elem.style.color || elem.tagName === 'IMG') {
		elem.setAttribute('mc:edit', mcEditId++);
	}
	if (elem.hasAttribute('data-repeatable')) {
		elem.setAttribute('mc:repeatable', 'true');
		elem.removeAttribute('data-repeatable');
	}
}