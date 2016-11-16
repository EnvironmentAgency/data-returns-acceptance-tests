// Maximum wait time
const MAX_WAIT = 45000;
const CHECK_INTERVAL = 100;

function checkForErrorCodeMaker(errorNumber) {
    let expectedErrorCode = `DR${errorNumber}`;
    browser.waitUntil(function () {
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        if (foundErrorCode) {
            expect(expectedErrorCode).toEqual(foundErrorCode);
            return true;
        }
        return false;
    }, MAX_WAIT, `Failed to find expected hidden element with error code for error ${expectedErrorCode} within the allowed time.`, CHECK_INTERVAL);
}

module.exports = function () {
    /**
     * File level validation error methods
     */
    this.Then(/^Invalid file information contains error for DR(\d+)$/, checkForErrorCodeMaker);

    /**
     * Corrections table (first level) error page
     */
    this.Then(/^Correction table contains error for DR(\d+) for the header "([^"]+)"$/, function (errorNumber, fieldName) {
        let row = browser.element(`#ERR_DR${errorNumber}`);
        let heading = browser.getText(`#ERR_DR${errorNumber} abbr`);
        return expect(row).not.toBeNull() && expect(heading).toEqual(fieldName);
    });
    this.Then(/^I open row correction details for error DR(\d+)$/, function (errorCode) {
        return browser.click(`//a[contains(@href, 'id=${errorCode}')]`);
    });

    /**
     * Corrections detail (second level) error page
     *
     * @param errorCode the DR9XXX code expected
     * @param errorTypes should be a comma delimited (no spaces) string containing all error types you should see on the corrections detail
     * page
     */
    this.Then(/^I expect the row correction details for error DR(\d+) to show errors for (.+)/, function(errorCode, errorTypes) {
        checkForErrorCodeMaker(errorCode);

        let expectedErrorTypes = errorTypes.split(",");
        // Error types are shown in the second column on the validation details page
        let errorTypesInTableRows = browser.getText("//tr//td[2]");

        for (let type of expectedErrorTypes) {
            // Ensure this type has one or more entries in the table
            expect(errorTypesInTableRows).toContain(type);

            // Ensure that the correct error messages are displayed at the top of the corrections detail page for each type
            // Find a div element with the appropriate class e.g. "CorrectionIncorrect"
            let errorMessage = browser.element(`div.Correction${type}`);
            expect(errorMessage).not.toBeNull();
        }
    });

    /**
    Given an individual row, check for an EA_ID substitution (inputEaId replaced with outputEaId)
    */
    function checkEaIdRow(row, inputEaId, outputEaId) {
        let inputIdSpan = row.element(".submittedUniqueIdentifier");
        let outputIdSpan = row.element(".resolvedUniqueIdentifier");


        console.log(`Found row containing ${inputIdSpan.getText()} substituted with ${outputIdSpan.getText()}`);

        return (inputIdSpan.getText() === inputEaId && outputIdSpan.getText() === outputEaId); 
    }


    this.Then(/^I see that (\S+) has been substituted to (\S+)$/, function (inputEaId, outputEaId) {
        let eaIdOutputRows = browser.element("li.ea-id");
        let foundMatch = false;

        if (Array.isArray(eaIdOutputRows)) {
            console.log(`Found ${eaIdOutputRows.length} rows of eaids`);
            for (let row of eaIdOutputRows) {
                if (checkEaIdRow(row, inputEaId, outputEaId)) {
                    foundMatch = true;
                    break;
                }
        
            }
        } else {
            foundMatch = checkEaIdRow(eaIdOutputRows, inputEaId, outputEaId);
        }

        expect(foundMatch).toEqual(true);   
    });
    

    this.Then(/^I see that the EA_ID (\S+) has been used$/, function (eaId) {

        let eaIdSpan = browser.element(".resolvedUniqueIdentifier");

        if (Array.isArray(eaIdSpan)) eaIdSpan = eaIdSpan[0];

        if (eaIdSpan.getText() === eaId) {
            return true;
        }
        throw `Failed to find EA_ID ${eaId} on confirmation page`; 
    });
};
