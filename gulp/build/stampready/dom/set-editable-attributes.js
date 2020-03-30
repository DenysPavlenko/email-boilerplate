const vendors                     = require('../../vendors');
const { setAttrs, getClassValue } = vendors;


const setNewAttrs = (elem, attrs) => {
	for (const key in attrs) {
		if (elem.hasAttribute(key)) {
			let attrValue = elem.getAttribute(key);
			let newAttributes = attrs[key].newAttrs;
			setAttrs(elem, newAttributes(attrValue));
			elem.removeAttribute('class');
		}
		else if (!elem.hasAttribute(key) && elem.hasAttribute('class') && attrs[key].condition){
			let attrValue = getClassValue(elem);
			let newAttributes = attrs[key].newAttrs;
			setAttrs(elem, newAttributes(attrValue));
			elem.removeAttribute('class');
		}
	}
}

module.exports = (elem) => {
	const dataAttributes = {
		'data-background': {
			'condition': elem.style.backgroundImage,
			'newAttrs': (value) => {
				return {
					'data-background': value,
						'data-bgcolor': value }
			}
		},
		'data-bgcolor': {
			'condition': elem.style.backgroundColor && !elem.style.backgroundImage,
			'newAttrs': (value) => {
				return {
					'data-bgcolor': value
				}
			}
		},
		'data-border': {
			'condition': elem.style.border || elem.style.borderBottom || elem.style.borderLeft || elem.style.borderTop || elem.style.borderRight,
			'newAttrs': (value) => {
				return {
					'data-border-color': value
				}
			}
		},
		'data-size': {
			'condition': elem.style.fontFamily,
			'newAttrs': (value) => {
				return {
					'data-size': value,
					'data-color': value,
				}
			}
		},
		'data-color': {
			'condition': elem.style.color,
			'newAttrs': () => { return false }
		}
	};

	setNewAttrs(elem, dataAttributes);
}