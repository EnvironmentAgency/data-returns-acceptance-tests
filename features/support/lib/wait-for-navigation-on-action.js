'use strict';
module.exports = function (action) {
    // Page Id element is embedded on each page by the frontend layout.html
    let pageId = browser.getValue("#pgid");
    action();
    browser.waitUntil(function () {
        return browser.getValue("#pgid") !== pageId;
    }, browser.options.waitforTimeout, 'expected page id to change as result of button click', browser.options.waitforInterval);
};