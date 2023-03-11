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

function save_dark_gradstr (str) {
    const dark_gradstr = str;
    storage.local.set({dark_gradstr});
}

async function get_dark_gradstr () {
    const str = await storage.local.get("dark_gradstr");
    if (str.dark_gradstr === null || str.dark_gradstr === undefined) {
        // hardcoded bad i know
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABgCAYAAAA3iqN1AAABKklEQVQoU2M8dfjL/4tszAyMh3Z8+/9SgoGBcefa7/+Ztf8yMG5Y/PO/rM1PBsblM379N/P/xsA4r/fP/4DET4OGAXKYnTfQYSCn6pj+gDheSvEPxDsc3P8YGEEe/PGViYHx8rnP/5/dZ2FgvHPj4/8rpzkYGJ8+/vD/0FYuBsZ379793zCfb9Aw7j7/8P/URqDDzt7/9P/xEXYGxj03vvz/exUYTasvfPsv/gIYTbNPfv+v/wsYTV0Hf/735P3FwFi56/f/ZDlgaGRu+vu/xvAzA2PE6v//pzm/HzQMkMNKTIEOAzk1RPU7xPFG4r8h3hFg/w/x4IefjBAvn3vJCgmENbc5GRhBwdJzmhcSTVl7BQcNA5SQWs4DHQZKWnMfASMOlNi2f2ZjAABKE9jIdbfCnAAAAABJRU5ErkJggg==";
    }
    return str.dark_gradstr;
}

export { save_light_gradstr, get_light_gradstr, save_dark_gradstr, get_dark_gradstr }
