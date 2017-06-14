'use strict';
const ControlledListMenuPage = require('../../../support/pages/controlled.list.menu.page');
module.exports = function () {
    this.defineStep('I open the controlled list menu', function () {
        ControlledListMenuPage.open();
    });
};
