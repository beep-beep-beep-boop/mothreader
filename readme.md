# mothreader

> reader view with coloring that makes it easier to read things (hopefully)

### Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/beep-beep-boop-boop/mothreader/`
1. run `npm install` to install all required dependencies
1. run `npm run build`

The build step will create the `distribution` folder, this folder will contain the generated extension.

You can then run `web-ext build` to build the extension .zip

### Run the extension

Using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is recommened for automatic reloading and running in a dedicated browser instance. Alternatively you can load the extension manually (see below).

1. run `npm run watch` to watch for file changes and build continuously
1. run `npm install --global web-ext` (only only for the first time)
1. in another terminal, run `web-ext run` for Firefox or `web-ext run -t chromium`
1. Check that the extension is loaded by opening the extension options ([in Firefox](media/extension_options_firefox.png) or [in Chrome](media/extension_options_chrome.png)).

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).

