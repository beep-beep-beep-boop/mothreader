import optionsStorage from './options-storage.js';
import mothify from './mothify';

//async function init() {
//	const options = await optionsStorage.getAll();
//	const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')';
//	const text = options.text;
//	const notice = document.createElement('div');
//	notice.innerHTML = text;
//	document.body.append(notice);
//	notice.id = 'text-notice';
//	notice.style.border = '2px solid ' + color;
//	notice.style.color = color;
//}

//init();

let already_mothed = false;

chrome.runtime.onMessage.addListener(function (msg) {
	if (msg === "mothreader") {
		if (!already_mothed) {
			already_mothed = true;
			mothify();
		} else {
			// reload to get rid of the moth
			location.reload();
		}
	}
});
