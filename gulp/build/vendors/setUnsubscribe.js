module.exports = (elem, usnubLink) => {
	if (elem.hasAttribute('data-unsubscribe')) {
		elem.setAttribute('href', usnubLink);
		elem.removeAttribute('data-unsubscribe');
	}
}