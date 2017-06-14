'use strict';
const waitForNav = require('../lib/wait-for-navigation-on-action');
const winston = require('winston');
const Page = require('./page');

class CorrectionsTablePage extends Page {
    get url () {
        return '/correction/table';
    }

    openCorrectionsDetail (errorCode) {
        winston.info(`Opening corrections detail page for error code ${errorCode}`);
        waitForNav(function () {
            const row = CorrectionsTablePage.getRowForErrorCode(errorCode);
            const errorsCell = row.element('td.td-errors');
            const detailHref = errorsCell.element('a');
            winston.info(`Opening corrections detail link ${detailHref.getAttribute('href')}`);
            detailHref.click();
        });
    }

    static getRowForErrorCode (errorCode) {
        return browser.element(`#ERR_${errorCode}`);
    }

    checkReportedFieldForErrorCode (errorCode, fieldName) {
        winston.info(`Checking field heading ${fieldName} is displayed for error code ${errorCode}`);
        const row = CorrectionsTablePage.getRowForErrorCode(errorCode);
        const heading = browser.getText(`#ERR_${errorCode} abbr`);
        row.should.not.be.null; // eslint-disable-line no-unused-expressions
        heading.should.equal(fieldName);
    }
}
module.exports = new CorrectionsTablePage();
