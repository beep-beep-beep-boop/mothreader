import optionsStorage from './options-storage.js';
import mothify from './mothify';

console.log("meow");
mothify();

//async function init() {
//	const options = await optionsStorage.getAll();
//	if (options.always_moth === true) {
//		mothify();
//	}
//}
//
//init();
//
//let already_mothed = false;
//
chrome.runtime.onMessage.addListener(function (msg) {
	if (msg === "unmothify") {
			location.reload();
	}
});