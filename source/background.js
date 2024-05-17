// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';

// tell the content script when the user clicks the extension icon
chrome.action.onClicked.addListener(function (tab) {
    // this will only be picked up by tabs that already have the script,
    // so that means the user is toggling the coloring off.
    chrome.tabs.sendMessage(tab.id, "unmothify")
        .catch(e => {}); // the error is expected when the content script isn't loaded so we can ignore it.

    //chrome.tabs.sendMessage(tab.id, "mothreader");
    // Send a message to the active tab
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["content.js"]
    });

});
