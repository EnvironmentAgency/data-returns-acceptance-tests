"use strict";
let Page = require('./page');

class ControlledListTablePage extends Page {
    get url() { return "/display-list" }

    checkDataDisplayed(dataItem) {
        super.checkOpen();
        browser.disableImplicitWait();

        let primaryValue = dataItem.primary;
        let expectedAliases = dataItem.aliases || [];

        // Find the name cell containing the text we are looking for
        let targetPrimaryValueCell = browser.$(`td.name=${primaryValue}`);
        targetPrimaryValueCell.getText().should.equal(primaryValue);

        if (expectedAliases && expectedAliases.length) {
            // Find the alias list items within the same row of data (jump to parent row and then down again)
            let targetAliasesElements = targetPrimaryValueCell.$("..").$$('td.aliases li');
            // For each <li> element we found, extract the text
            let targetAliasTextArr = targetAliasesElements.map(li => li.getText());
            // Ensure that the expected aliases are displayed
            targetAliasTextArr.should.include.members(expectedAliases);
        }

        browser.restoreImplicitWait();
    }

}
module.exports = new ControlledListTablePage();