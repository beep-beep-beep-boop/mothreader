// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';

// tell the content script when the user clicks the extension icon
chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, "mothreader");
    // Send a message to the active tab
});
