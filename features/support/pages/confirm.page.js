'use strict';
const Page = require('./page');

/**
 * Check for the appropriate substitution detail on a given row
 *
 * @param {object} row the row to rest
 * @param {string} inputEaId the expected input EA_ID
 * @param {string} outputEaId the expected output EA_ID
 * @return {boolean} if the expectations pass, false otherwise
 */
function checkEaIdRow (row, inputEaId, outputEaId) {
    const inputIdSpan = row.element('.submittedUniqueIdentifier');
    inputIdSpan.waitForExist(browser.options.waitforTimeout);
    const outputIdSpan = row.element('.resolvedUniqueIdentifier');
    outputIdSpan.waitForExist(browser.options.waitforTimeout);
    return (inputIdSpan.getText() === inputEaId && outputIdSpan.getText() === outputEaId);
}

class ConfirmPage extends Page {
    get url () { return '/file/confirm'; }

    checkEaIdSubstituted (originalEaId, substitutedEaId) {
        const eaIdOutputRows = browser.element('li.ea-id');
        let foundMatch = false;

        if (Array.isArray(eaIdOutputRows)) {
            for (const row of eaIdOutputRows) {
                if (checkEaIdRow(row, originalEaId, substitutedEaId)) {
                    foundMatch = true;
                    break;
                }
            }
        } else {
            foundMatch = checkEaIdRow(eaIdOutputRows, originalEaId, substitutedEaId);
        }

        foundMatch.should.be.true; // eslint-disable-line no-unused-expressions
    }

    checkEaIdReported (eaId) {
        let eaIdSpan = browser.element('.resolvedUniqueIdentifier');
        if (Array.isArray(eaIdSpan)) eaIdSpan = eaIdSpan[0];
        eaIdSpan.getText().should.be.equal(eaId);
    }
}
module.exports = new ConfirmPage();
