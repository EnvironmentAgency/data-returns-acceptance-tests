'use strict';
module.exports = function () {
    this.defineStep(/^I see the page header "([^"]*)"$/, function (expectedHeading) {
        const heading = browser.getText('span#title');
        heading.should.equal(expectedHeading);
    });
};
