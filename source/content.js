import optionsStorage from './options-storage.js';
import mothify from './mothify';

async function init() {
	const options = await optionsStorage.getAll();
	if (options.always_moth === true) {
		mothify();
	}
}

init();

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
