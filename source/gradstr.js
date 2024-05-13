import browser, { storage } from 'webextension-polyfill';
import { gen_grad_str } from './gradient';


function save_light_gradstr (str) {
    const light_gradstr = str;
    storage.local.set({light_gradstr});
}

async function get_light_gradstr () {
    const str = await storage.local.get("light_gradstr");
    if (str.light_gradstr === null || str.light_gradstr === undefined) {

        const light_grad_str = gen_grad_str("#0000ff", "#000000", "#ff0000");
        save_light_gradstr(light_grad_str);
        
        return light_grad_str;
    }
    return str.light_gradstr;
}

function save_dark_gradstr (str) {
    const dark_gradstr = str;
    storage.local.set({dark_gradstr});
}

async function get_dark_gradstr () {
    const str = await storage.local.get("dark_gradstr");
    if (str.dark_gradstr === null || str.dark_gradstr === undefined) {

        const dark_grad_str = gen_grad_str("#9e8dfc", "#eeeeee", "#58acff");
        save_dark_gradstr(dark_grad_str);
        
        return dark_grad_str;
    }
    return str.dark_gradstr;
}

export { save_light_gradstr, get_light_gradstr, save_dark_gradstr, get_dark_gradstr }
