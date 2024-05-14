import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';
import $ from "jquery";
import { get_dark_gradstr, get_light_gradstr } from './gradstr';
import { is_dark } from './is_dark';

/// return html of only the article that's on the page
function readable() {
    let doc = document.cloneNode(true)
    const reader = new Readability(doc)
    const article = reader.parse()
    const markup = DOMPurify.sanitize(article.content)

    return markup;
}

/// remove all css styling from the page
function clearStyles() {
    document
        .querySelectorAll('style,link[rel="stylesheet"]')
        .forEach(item => item.remove());
}

/// add css to the page
function addStyle(css_str) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css_str));

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}

//const background_color = "rgb(28, 27, 34)";
//const width = "720px";
//const font_family = "Georgia, \"Times New Roman\", serif";
//const font_size_pixels = 14;
//const line_height_pixels = 20;
//const text_color_default = "#eee";
//const text_color_1 = "rgb(158, 141, 252)";
//const text_color_2 = "rgb(88, 171, 255)";
//
//const ratio = 128 / (line_height_pixels * 4);
//const new_bg_size = 128 / ratio;
//const new_bg_pos = 0;//8 / ratio;
//
///// the style that helps put the grandient lines
//const moth_style = `
//p {
//    font-size:${font_size_pixels}px;
//    line-height:${line_height_pixels}px;
//    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABgCAIAAAC46DQiAAAABmJLR0QALwAxADZQwRmUAAAAaklEQVQoz73SsQ3EIBQE0flU8DuAEq8TtwgVQAfj5GQJOyd60kQbLHr9tEDr8AedqaEGFIAjLEgoHdqHAfUdSZ0aqCd3JsAqDaC/qABjj0zVDBXi3E5YkAU6tA8D6h7R1BkKeHJnrud8Ozcg8ECQiy6ifAAAAABJRU5ErkJggg==);
//    background-position-y:${new_bg_pos}px;
//    background-size:100% ${new_bg_size}px;
//    -webkit-background-clip:text;
//    -webkit-text-fill-color:transparent
//}
//body {
//    font-family: ${font_family};
//    background-color: ${background_color};
//    color: ${text_color_default}
//}
//.page {
//    max-width: ${width};
//    margin: 0 auto;
//}
//
//.page,
//.page .line {
//    text-align: justify; 
//}
//`;

function gen_style(font_size_pixels, line_height_pixels, offset_pixels, gradient_str) {
    const new_bg_pos = 0;//8 / ratio;
    const background_size_px = line_height_pixels * 4;

    const style = {
        "background-image":`url(${gradient_str})`,
        "background-position-y":`${new_bg_pos}px`,
        "background-size":`100% ${background_size_px}px`,
        "-webkit-background-clip":"text",
        "-webkit-text-fill-color":"transparent",
    };

    return style;
}

/// return only the text that is directly in the node, not in any of its children.
$.fn.immediateText = function() {
    return this.contents().not(this.children()).text();
};

/// return the first child of the element that directly contains text and is not a `p` element.
$.fn.findFirstTextContainingNonPChild = function() {
    let child = null;

    $(this).children(":not(p)").each(function() {
        if ($(this).immediateText().trim().length > 0) {
            child = $(this);
            return;
        }
    });

    return child;
}

/// mothify an individual jquery element
function mothify_element(element, light_gradient_str, dark_gradient_str) {
    let element_to_get_values_from = element;


    // this is for situations where the p element contains a span as a child
    // where the font size or line height is set in the span and not the p element.
    if (element.immediateText().trim().length === 0) {
        // if the element contains no text, its children must.
        let text_containing_child = element.findFirstTextContainingNonPChild();
        if (text_containing_child === null) {
            // if there's no child containing text that's not a p element, return.
            // the child p element will be visited later and mothified i think.
            return;
        } 

        // we should set the font size and line height values from that of the child instead;
        element_to_get_values_from = text_containing_child;
    }

    const element_font_size = parseInt(element_to_get_values_from.css('font-size'));

    const css_line_height = element_to_get_values_from.css('line-height');

    let element_line_height;
    if (css_line_height == "normal") element_line_height = 1.2 * element_font_size;
    else element_line_height = parseInt(css_line_height);

    const element_offset = element.offset().top;

    // detect whether the pharagraph has a dark or light text color
    // this seems more reliable than checking the background color
    // note: for pages with a lot of pharagrapg elements i feel like this
    // might be pretty slow.
    // i wonder if just getting the color of the body element is good enough?
    // just thinking, e.g. if there's any p elmenets in a light page that happen
    // to have a dark background it might color them incorrectly if we did it that way...
    const p_color_str = element_to_get_values_from.css('color');
    const p_is_dark = is_dark(p_color_str);

    let gradient_str;

    if (p_is_dark === false) {
        gradient_str = dark_gradient_str;
    } else {
        gradient_str = light_gradient_str;
    }

    const new_css = gen_style(element_font_size, element_line_height, element_offset, gradient_str);

    element.css(new_css);
}

async function mothify() {
    // replace document with readable document
    //document.body.innerHTML = readable();

    //clearStyles();

    //addStyle(moth_style);

    const dark_gradient_str = await get_dark_gradstr();
    const light_gradient_str = await get_light_gradstr();

    $('p').each(function () {
        const obj = $(this);

        if (obj.text().trim().length > 0) {
            // if the p element conatines text
            mothify_element(obj, light_gradient_str, dark_gradient_str);
        }
    });

//
//    (function () {
//
//        $('.page p, ul, ol').each(function () {
//            var obj = $(this);
//            var html = obj.html().replace(/(?<!(<\/?[^>]*|&[^;]*))([^\s<]+)/g, '$1<word>$2 </word>');
//            obj.html(html);
//        });
//
//        var groups = 4;
//        var spans = $('.page word');
//
//        function highlight() {
//            var startOfGroup = 0;
//            $('.page .line').find('word:first').unwrap();
//
//            for (var i = 1; i <= spans.length; i++) {
//                if (i != spans.length &&
//                    spans[i - 1].offsetTop === spans[i].offsetTop &&
//                    spans[i - 1].offsetHeight === spans[i].offsetHeight
//                ) continue;
//                spans.slice(startOfGroup, i).wrapAll(`<span class='line'></span>`);
//                startOfGroup = i;
//            }
//        }
//
//        let timeout;
//        $(window).on('load resize', function () {
//            window.clearTimeout(timeout);
//            timeout = window.setTimeout(highlight, 30);
//        });
//
//        highlight();
//
//    })();

}

export default mothify;