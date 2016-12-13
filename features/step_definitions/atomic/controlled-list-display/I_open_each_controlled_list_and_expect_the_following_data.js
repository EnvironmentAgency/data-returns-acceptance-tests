'use strict';
let ControlledListMenuPage = require("../../../support/pages/controlled.list.menu.page");
let ControlledListTablePage = require("../../../support/pages/controlled.list.table.page");
module.exports = function () {
    this.defineStep('I open each controlled list and expect the following data', {timeout: 10 * 60 * 1000}, function (dataTable) {
        for (let row of dataTable.hashes()) {
            let listTitle = row.Title;
            let expectedData = {
                list: listTitle,
                primary: row.Primary,
                aliases: JSON.parse(row.Aliases)
            };
            ControlledListMenuPage.open();
            ControlledListMenuPage.openControlledList(listTitle);
            ControlledListTablePage.checkDataDisplayed(expectedData);
        }
    });
};