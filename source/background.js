// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';
import browser from "webextension-polyfill";

const listener = function(tab) {
    // this will only be picked up by tabs that already have the script,
    // so that means the user is toggling the coloring off.
    browser.tabs.sendMessage(tab.id, "unmothify")
        .catch(e => {}); // the error is expected when the content script isn't loaded so we can ignore it.

    //chrome.tabs.sendMessage(tab.id, "mothreader");
    // Send a message to the active tab
    browser.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["source/content.js"]
    });
};

if (__BROWSER__ === "firefox") {
    chrome.browserAction.onClicked.addListener(listener);
} else {
    chrome.action.onClicked.addListener(listener);
}
