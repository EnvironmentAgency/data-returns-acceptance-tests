"use strict";
let Page = require('./page');
const winston = require('winston');

class ControlledListTablePage extends Page {
    get url() {
        return "/display-list"
    }

    checkDataDisplayed(dataItem) {
        let primaryValue = dataItem.primary;
        let expectedAliases = dataItem.aliases || [];

        // Find the name cell containing the text we are looking for
        winston.info(`ControlledListTablePage: Checking ${dataItem.list} list has a primary value of "${dataItem.primary}"`);
        let targetPrimaryValueCell = browser.$(`td.name=${primaryValue}`);
        targetPrimaryValueCell.getText().should.equal(primaryValue);

        if (expectedAliases && expectedAliases.length) {
            winston.info(`ControlledListTablePage: Checking ${dataItem.list} list displays the aliases "${expectedAliases}" for "${dataItem.primary}"`);
            // Find the alias list items within the same row of data (jump to parent row and then down again)
            let parentRow = targetPrimaryValueCell.$("..");
            let aliasesCell = parentRow.$('td.aliases');
            if (!aliasesCell) {
                winston.error(`Unable to traverse to aliases cell of ${dataItem.list} table but expecting aliases ${expectedAliases}`);
            } else {
                let targetAliasesElements = aliasesCell.$$('li');
                // For each <li> element we found, extract the text
                let targetAliasTextArr = targetAliasesElements.map(li => li.getText());
                // Ensure that the expected aliases are displayed
                winston.info(`ControlledListTablePage: Found aliases for "${dataItem.primary}": ${targetAliasTextArr}`);
                targetAliasTextArr.should.include.members(expectedAliases);
            }
        }
    }

}
module.exports = new ControlledListTablePage();