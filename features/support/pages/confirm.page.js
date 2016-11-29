"use strict";
let Page = require('./page');
const waitForNav = require('../lib/wait-for-navigation-on-action');

function checkEaIdRow(row, inputEaId, outputEaId) {
    let inputIdSpan = row.element(".submittedUniqueIdentifier");
    inputIdSpan.waitForExist(browser.options.waitforTimeout);
    let outputIdSpan = row.element(".resolvedUniqueIdentifier");
    outputIdSpan.waitForExist(browser.options.waitforTimeout);
    return (inputIdSpan.getText() === inputEaId && outputIdSpan.getText() === outputEaId);
}


class ConfirmPage extends Page {
    get url() { return "/file/confirm" }

    checkEaIdSubstituted(originalEaId, substitutedEaId) {
        super.checkOpen();
        let eaIdOutputRows = browser.element("li.ea-id");
        let foundMatch = false;

        if (Array.isArray(eaIdOutputRows)) {
            for (let row of eaIdOutputRows) {
                if (checkEaIdRow(row, originalEaId, substitutedEaId)) {
                    foundMatch = true;
                    break;
                }
            }
        } else {
            foundMatch = checkEaIdRow(eaIdOutputRows, originalEaId, substitutedEaId);
        }

        foundMatch.should.be.true;
    }

    checkEaIdReported(eaId) {
        super.checkOpen();
        let eaIdSpan = browser.element(".resolvedUniqueIdentifier");
        if (Array.isArray(eaIdSpan)) eaIdSpan = eaIdSpan[0];
        eaIdSpan.getText().should.be.equal(eaId);
    }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        waitForNav(function() {
            button.click();
        });
    }
}
module.exports = new ConfirmPage();