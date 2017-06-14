'use strict';
const Page = require('./page');
const winston = require('winston');

class ControlledListTablePage extends Page {
    get url () {
        return '/display-list';
    }

    checkDataDisplayed (dataItem) {
        const primaryValue = dataItem.primary;
        const expectedAliases = dataItem.aliases || [];

        // Find the name cell containing the text we are looking for
        winston.info(`ControlledListTablePage: Checking ${dataItem.list} list has a primary value of "${dataItem.primary}"`);
        const targetPrimaryValueCell = browser.$(`td.name=${primaryValue}`);
        targetPrimaryValueCell.getText().should.equal(primaryValue);

        if (expectedAliases && expectedAliases.length) {
            winston.info(`ControlledListTablePage: Checking ${dataItem.list} list displays the aliases "${expectedAliases}" for "${dataItem.primary}"`);
            // Find the alias list items within the same row of data (jump to parent row and then down again)
            const parentRow = targetPrimaryValueCell.$('..');
            const aliasesCell = parentRow.$('td.aliases');
            if (!aliasesCell) {
                winston.error(`Unable to traverse to aliases cell of ${dataItem.list} table but expecting aliases ${expectedAliases}`);
            } else {
                const targetAliasesElements = aliasesCell.$$('li');
                // For each <li> element we found, extract the text
                const targetAliasTextArr = targetAliasesElements.map(li => li.getText());
                // Ensure that the expected aliases are displayed
                winston.info(`ControlledListTablePage: Found aliases for "${dataItem.primary}": ${targetAliasTextArr}`);
                targetAliasTextArr.should.include.members(expectedAliases);
            }
        }
    }
}
module.exports = new ControlledListTablePage();
