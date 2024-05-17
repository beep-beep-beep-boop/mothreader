// Don't forget to import this wherever you use it
import browser, { storage } from 'webextension-polyfill';

import optionsStorage from './options-storage.js';
import { gen_grad_str } from './gradient.js';
import { save_dark_gradstr, save_light_gradstr } from './gradstr.js';

optionsStorage.syncForm('#options-form');

const colorInputs = [...document.querySelectorAll('input[type="color"]')];

function updateGradient() {
	const light_str = gen_grad_str(colorInputs[0].value, colorInputs[1].value, colorInputs[2].value);
	save_light_gradstr(light_str);

	const dark_str = gen_grad_str(colorInputs[3].value, colorInputs[4].value, colorInputs[5].value);
	save_dark_gradstr(dark_str);
}

for (const color of colorInputs) {
	color.addEventListener('input', updateGradient, false);
	color.addEventListener('change', updateGradient, false)
}