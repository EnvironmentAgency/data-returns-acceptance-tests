'use strict';
const winston = require("winston");
const util = require('util');
const DataReturnsUserSession = require('./preload-file');
let StartPage = require("../pages/start.page.js");
let UploadPage = require("../pages/upload.page.js");
module.exports = function (files) {
    StartPage.open();
    if (browser.desiredCapabilities.preloadFiles) {
        /**
         * Preload files directly into a data returns frontend preload session (files uploaded from test runner rather than from client browser)
         */
        let preloadSession = new DataReturnsUserSession(browser.options.baseUrl + '/file/preload');
        let filenames = Array.isArray(files) ? files : [files];
        filenames = filenames.map(filename => `features/support/files/${filename}`);
        return preloadSession.upload(filenames)
            .then((sessionData) => {
                winston.info(`Finished uploading all files.  Initialising browser for preloaded session: ${util.inspect(sessionData, {depth: null, colors: true})}`);
                browser.url(`/file/preload?sessionId=${sessionData.sessionId}&sessionKey=${sessionData.sessionKey}`)
            });
    } else {
        StartPage.continue();
        UploadPage.upload(files);
    }
};