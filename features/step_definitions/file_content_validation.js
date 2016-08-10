function checkForErrorCodeMaker(errorCode) {
  let hiddenElement = browser.element(`//hidden[@value='DR${errorCode}']`);
  expect(hiddenElement).not.toBeNull();
}

module.exports = function() {
  //------------ These check that the correct DR error message is displayed ------------------
  this.Then(/^Validation information contains error for DR(\d+)$/, checkForErrorCodeMaker);

  this.Then(/^I open row correction details for error DR(\d+)$/, function (errorCode) {
    let rowCorrectionsLink = browser.element(`//a[contains(@href, 'id=DR${errorCode}')]`);
    rowCorrectionsLink.click();
  });

  this.Then(/^I expect the row correction details for error DR(\d+) to be shown$/, checkForErrorCodeMaker);

  //------------ First level error details table ----------
  this.Given(/^I expect the column heading for error DR(\d+) to be "([^"]+)"$/, function(errorCode, heading) {
    // Column header name is in first cell of the row (td[1])
    return expect(browser.getText(`//tr[@id='ERR_DR${errorCode}']//td[1]`)).toEqual(heading);
  });
  this.Given(/^I expect the error type for error DR(\d+) to be "([^"]+)"$/, function(errorCode, errorType) {
    // Error type is in second cell of the row (td[2])
    return expect(browser.getText(`//tr[@id='ERR_DR${errorCode}']//td[2]`)).toEqual(errorType);
  });
};
