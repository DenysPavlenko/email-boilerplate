module.exports = (elem) => {
	for (var key in elem.dataset) {
		elem.removeAttribute("data-" + key.split(/(?=[A-Z])/).join("-").toLowerCase());
	}
}