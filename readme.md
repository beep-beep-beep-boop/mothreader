# mothreader

> color web pages text with a gradient that makes it easier to read things (hopefully)

[Install from addons.mozilla (firefox)](https://addons.mozilla.org/en-US/firefox/addon/mothreader/)

Can also manually install from the zip on the releases page

### Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/beep-beep-boop-boop/mothreader/`
2. run `npm install` to install all required dependencies
3. run `./build.sh`

this will create a `dist-chrome.zip` and `dist-firefox.zip`, which are (hopefully) valid web extension files.

### Debugging the extension

I didn't bother getting this to work again, so you probably just have to do the build step and add it manually. In firefox you can go to `about:debugging` and add a temporary extension w/ debugging tool access.

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).

