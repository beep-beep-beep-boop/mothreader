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
const font_size = "24px"
const line_height = "1.6"
const text_color_default = "#eee";
const text_color_1 = "rgb(158, 141, 252)";
const text_color_2 = "rgb(88, 171, 255)";

/// the style that helps put the grandient lines
const moth_style = `
body {
    font-family: ${font_family};
    font-size: ${font_size};
    line-height: ${line_height};
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
.page .line {
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}
.page .line + srword:not(.line),
.page .line srword:first-child {
    white-space: nowrap; 
}

.page .line:nth-child(4n + 1) {
    background-image: -webkit-linear-gradient(to right, ${text_color_default} 0%,${text_color_1} 80%);
    background-image: linear-gradient(to right, ${text_color_default} 0%,${text_color_1} 80%);
}
.page .line:nth-child(4n + 2) {
    background-image: -webkit-linear-gradient(to right, ${text_color_1} 20%,${text_color_default} 100%);
    background-image: linear-gradient(to right, ${text_color_1} 20%,${text_color_default} 100%);
}
.page .line:nth-child(4n + 3) {
    background-image: -webkit-linear-gradient(to right, ${text_color_default} 0%,${text_color_2} 80%);
    background-image: linear-gradient(to right, ${text_color_default} 0%,${text_color_2} 80%);
}
.page .line:nth-child(4n + 4) {
    background-image: -webkit-linear-gradient(to right, ${text_color_2} 20%,${text_color_default} 100%);
    background-image: linear-gradient(to right, ${text_color_2} 20%,${text_color_default} 100%);
}
`;

function mothify() {
    // replace document with readable document
    document.body.innerHTML = readable();

    clearStyles();

    addStyle(moth_style);

    (function () {

        $('.page p, ul, ol').each(function () {
            var obj = $(this);
            var html = obj.html().replace(/(?<!(<\/?[^>]*|&[^;]*))([^\s<]+)/g, '$1<word>$2 </word>');
            obj.html(html);
        });

        var groups = 4;
        var spans = $('.page word');

        function highlight() {
            var startOfGroup = 0;
            $('.page .line').find('word:first').unwrap();

            for (var i = 1; i <= spans.length; i++) {
                if (i != spans.length &&
                    spans[i - 1].offsetTop === spans[i].offsetTop &&
                    spans[i - 1].offsetHeight === spans[i].offsetHeight
                ) continue;
                spans.slice(startOfGroup, i).wrapAll(`<span class='line'></span>`);
                startOfGroup = i;
            }
        }

        let timeout;
        $(window).on('load resize', function () {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(highlight, 30);
        });

        highlight();

    })();

}

export default mothify;