import chroma from "chroma-js";

const gradient_length = 10;
const between_length = 14;
const shift_amount = 6;

function gradient (from, to) {
    return chroma.scale([from, to]).colors(gradient_length);
}

function strip (color) {
    const a = new Array(between_length);
    return a.fill(color);
}

function shift (a) {

    const before_arr = a.slice(-shift_amount);
    const after_arr = a.slice(0, a.length - shift_amount)

    const res = [...before_arr, ...after_arr];

    return res;
}

function moth_grad_array (color_1, color_fill, color_2) {
    const line_1 = shift([...strip(color_fill), ...gradient(color_fill, color_1), ...strip(color_1), ...gradient(color_1, color_fill), ...strip(color_fill), ...gradient(color_fill, color_2), ...strip(color_2), ...gradient(color_2, color_fill)]);
    const line_2 = shift([...strip(color_1), ...gradient(color_1, color_fill), ...strip(color_fill), ...gradient(color_fill, color_2), ...strip(color_2), ...gradient(color_2, color_fill), ...strip(color_fill), ...gradient(color_fill, color_1)]);
    return [line_1, line_2];
}

function gen_grad_str(color_1, color_fill, color_2) {
    const a = moth_grad_array(color_1, color_fill, color_2)

    let canvas = document.querySelector("canvas"), // Select our canvas element
        ctx = canvas.getContext("2d"), // Save the context we're going to use
        height = a[0].length, // Get the width
        width = a.length, // Get the height
        scale = 1; // Scales the whole image by this amount

    canvas.width = width * scale; // Set the canvas width
    canvas.height = height * scale; // Set the canvas height

    // Loop through each color and draw that section
    for(var col = 0; col < height; col++) {
        for(var row = 0; row < width; row++) {
            ctx.fillStyle = a[row][col]; // Set the color to the one specified
            ctx.fillRect(row * scale, col * scale, scale, scale); // Actually draw the rectangle
        }
    }

    return canvas.toDataURL();
}

export { gen_grad_str };