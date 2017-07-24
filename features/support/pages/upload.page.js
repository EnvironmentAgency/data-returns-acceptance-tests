'use strict';
const Page = require('./page');
const winston = require('winston');
const waitForNav = require('../lib/wait-for-navigation-on-action');

/**
 * Get an XPath selector to the appropriate row in the uploads table for the given filename
 *
 * @param {string} filename the filename to look for
 * @return {string} the XPath selector for the given filename
 */
function getUploadRowSelector (filename) {
    // Selector to find a row which contains a column with the correct filename
    return `//table[@id="upload-list"]//tr[@filename = '${filename}']`;
}

/**
 * Get an XPath selector to the status cell in the uploads table for the given filename
 *
 * @param {string} filename the filename to look for
 * @return {string} the XPath selector for the given filename
 */
function getUploadFileStatusSelector (filename) {
    // Selector to find the status text for the file upload row
    return `${getUploadRowSelector(filename)}/td[@class='status']`;
}
/**
 * Get an XPath selector to the more details/show corrections link in the uploads table for the given filename
 *
 * @param {string} filename the filename to look for
 * @return {string} the XPath selector for the given filename
 */
function getUploadFileMoreDetailsLinkSelector (filename) {
    // Selector to find the more details link for the file upload row
    return `${getUploadRowSelector(filename)}//td[@class='details']/a`;
}
// function getUploadFileRemoveLinkSelector(filename) {
//     // Selector to find the submit button on the remove file form in the upload list
//     return `${getUploadRowSelector(filename)}/td[@class='remove']//input[@type='submit']`;
// }
//

class UploadPage extends Page {
    get url () {
        return '/file/choose';
    }

    get uploaderXpath () {
        return "//input[@type='file']";
    }

    get uploader () {
        return browser.element(this.uploaderXpath);
    }

    upload (files) {
        const uploader = browser.element(this.uploaderXpath);
        uploader.waitForExist(browser.options.waitforTimeout);

        let filenames = Array.isArray(files) ? files : [files];
        filenames = filenames.map(filename => `features/support/files/${filename}`);

        const mustSubmit = browser.isExistingSafe('#submit-upload');
        for (const filename of filenames) {
            browser.chooseFile(this.uploaderXpath, filename);

            // If JavaScript is disabled then there is an additional step to upload the file(s)
            if (mustSubmit) {
                browser.element('#submit-upload').click();
            }
        }
    }

    ensureFileStatusEqual (filename, status) {
        const fileStatusSelector = getUploadFileStatusSelector(filename);
        const expectedStatus = status.toUpperCase();
        let actualStatus = null;

        // Wait for the file to finish checking.
        browser.waitUntil(function () {
            try {
                actualStatus = browser.getText(fileStatusSelector).toUpperCase();
            } catch (e) {
                actualStatus = null;
            }

            if (!actualStatus || actualStatus === 'CHECKING') {
                winston.debug(`Waiting for ${filename} to finish CHECKING.`);
                return false;
            }
            return true;
        }, browser.options.waitforTimeout, `${filename} did not finish checking before the allowed timeout.`, browser.options.waitforInterval);

        // Now check the file status matches expectations
        actualStatus = browser.getText(fileStatusSelector).toUpperCase();
        actualStatus.should.equal(expectedStatus);
    }

    openFileDetails (filename) {
        winston.debug(`Opening file details for ${filename} from the file upload table.`);
        const selector = getUploadFileMoreDetailsLinkSelector(filename);
        waitForNav(function () {
            browser.click(selector);
        });
    }

    ensureCanContinue () {
        const button = browser.element('#continueBtn');
        const disabled = button.getAttribute('disabled') === 'true';
        disabled.should.be.false; // eslint-disable-line no-unused-expressions
    }

    ensureCantContinue () {
        const button = browser.element('#continueBtn');
        const disabledAttribute = button.getAttribute('disabled');
        winston.info('Continue button status: ' + disabledAttribute);
        const disabled = disabledAttribute === 'true';
        disabled.should.be.true; // eslint-disable-line no-unused-expressions
    }
}
module.exports = new UploadPage();
