'use strict';
let StartPage = require("../pages/start.page.js");
let UploadPage = require("../pages/upload.page.js");
module.exports = function(filenames) {
    StartPage.open();
    if (browser.desiredCapabilities.preloadFiles) {
        let sessionData = browser.preloadFiles(filenames);
        browser.url(`/file/preload?sessionId=${sessionData.sessionId}&sessionKey=${sessionData.sessionKey}`);
    } else {
        StartPage.continue();
        UploadPage.upload(filenames);
    }
};