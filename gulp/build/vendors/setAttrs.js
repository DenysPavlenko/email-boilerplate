module.exports = (elem, attrs) => {
	for (let key in attrs) {
		elem.setAttribute(key, attrs[key]);
	}
};