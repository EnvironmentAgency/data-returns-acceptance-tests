'use strict';
module.exports = function(action) {
    let currentUrl = browser.getUrl();
    action();
    browser.waitUntil(function() {
        return browser.getUrl() !== currentUrl;
    }, browser.options.waitforTimeout,
        'expected url to change as result of button click',
        browser.options.waitforInterval);
};