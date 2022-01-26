// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';

// tell the content script when the user clicks the extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, "mothreader");
});
