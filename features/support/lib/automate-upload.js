'use strict';
const winston = require("winston");
const waitForNav = require('./wait-for-navigation-on-action');
let StartPage = require("../pages/start.page.js");
let UploadPage = require("../pages/upload.page.js");
module.exports = function (files) {
    StartPage.open();
    if (browser.desiredCapabilities.preloadFiles) {
        /**
         * Preload files directly into a data returns frontend preload session (files uploaded from test runner rather than from client browser)
         */
        let sessionData = browser.preloadFiles(files);
        waitForNav(function() {
            winston.info(`Opening preload session ${sessionData.sessionId}`);
            browser.url(`/file/preload?sessionId=${sessionData.sessionId}&sessionKey=${sessionData.sessionKey}`);
        });
    } else {
        StartPage.continue();
        UploadPage.upload(files);
    }
};