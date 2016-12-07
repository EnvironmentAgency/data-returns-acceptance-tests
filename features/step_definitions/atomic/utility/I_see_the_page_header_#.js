'use strict';
module.exports = function () {
    this.defineStep(/^I see the page header "([^"]*)"$/, function (expectedHeading) {
        let heading = browser.element('//main//h1');
        let text = heading.getText();
        text.should.equal(expectedHeading);
    });
};