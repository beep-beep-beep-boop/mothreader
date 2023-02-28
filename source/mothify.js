import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';
import $ from "jquery";

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

const background_color = "rgb(28, 27, 34)";
const width = "720px";
const font_family = "Georgia, \"Times New Roman\", serif"
const font_size_pixels = 24;
const line_height_pixels = 20;
const text_color_default = "#eee";
const text_color_1 = "rgb(158, 141, 252)";
const text_color_2 = "rgb(88, 171, 255)";

const ratio = 128 / (new_line_height * 4)
const new_bg_size = 128 / ratio;
const new_bg_pos = 0;//8 / ratio;

/// the style that helps put the grandient lines
const moth_style = `
p {
    font-size:${font_size_pixels}px;
    line-height:${line_height_pixels}px;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABgCAIAAAC46DQiAAAAYUlEQVQoz73SwQ3DIBAF0aetYDuAEtNJWoQKTAfOgcgS+M5pVnMafS0+X4JWHyAv4CbmdQDJICrthULfpYuckU52DshoUDd0KKuUZizc5zpJRlBpLxT6KtdFT3aO3H/wjx/oyySm/xnbdAAAAABJRU5ErkJggg==);
    background-position-y:${new_bg_pos}px;
    background-size:100% ${new_bg_size}px;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent
}
body {
    font-family: ${font_family};
    background-color: ${background_color};
}
.page {
    max-width: ${width};
    margin: 0 auto;
}

.page,
.page .line {
    text-align: justify; 
}
`;

function mothify() {
    console.log("meow");
    // replace document with readable document
    //document.body.innerHTML = readable();

    clearStyles();

    addStyle(moth_style);
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