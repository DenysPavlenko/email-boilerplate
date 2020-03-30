// Create div
let div = document.createElement('DIV');
div.classList.add('gridBox');
// Add styles to gridBox
Object.assign(div.style, {position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents:'none'});
// Append div into body
let body = document.querySelector('body');
body.appendChild(div);
// Get gridBox
let gridBox = document.querySelector('.gridBox');
// Get body height
let elHeight = body.clientHeight / 20 + 10;
// Drow grid
for (var i = 0; i < elHeight; i++) {
	let childDiv = document.createElement('DIV');
	// Add styles to each grid line
	Object.assign(childDiv.style, {height: '1px', marginTop: '19px', opacity: '1', background: '#4affff'});
	gridBox.appendChild(childDiv);
}