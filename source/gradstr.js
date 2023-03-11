import browser, { storage } from 'webextension-polyfill';


function save_light_gradstr (str) {
    const light_gradstr = str;
    storage.local.set({light_gradstr});
}

async function get_light_gradstr () {
    const str = await storage.local.get("light_gradstr");
    if (str.light_gradstr === null || str.light_gradstr === undefined) {
        // hardcoded bad i know
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABgCAYAAAA3iqN1AAAArUlEQVQoU83SURWFIBCE4dkeGAR7YA80h9gDe2AQ7bF35m4JHjx+5/jyD2JA9YYLBjSv2IXuBZswPGMVXk9YBHfwNQ9e9uRIBY6IB+6Yw26hEv/4QhQhE6eQiEcA4dMgMeZTfCYeDFghbnRYJS40WCN2VFgnNu0axKrTeIkFCaZRGjcLFMZJkXoIir8FzeHnGLgImswnDuEUdCyPoP/FbRMhMf6LqzXiRhXvvIc/02jH0ZWBH8sAAAAASUVORK5CYII=";
    }
    return str.light_gradstr;
}

export { save_light_gradstr, get_light_gradstr }
