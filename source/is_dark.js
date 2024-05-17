import chroma from "chroma-js";

function getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
        red: match[1],
        green: match[2],
        blue: match[3]
    } : {};
}

function is_dark(rgb_str) {
    const rgb = getRGB(rgb_str);

    const lightness = chroma.rgb(rgb.red, rgb.green, rgb.blue).hsl()[2];

    return lightness <= 0.5
}

export { is_dark };
