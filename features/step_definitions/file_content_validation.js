function checkForErrorCodeMaker(errorCode) {
  let hiddenElement = browser.element(`//hidden[@value='DR${errorCode}']`);
  expect(hiddenElement).not.toBeNull();
}

module.exports = function() {
this.Then(/^Invalid file information contains error for DR(\d+)$/, function (errorNumber) {
    let elem = browser.element('#error_code');
    let foundErrorCode = elem.getAttribute('value');
    let expectedErrorCode = "DR" + errorNumber;
    return expect(expectedErrorCode).toEqual(foundErrorCode);
});
this.Then(/^Correction details contains error for DR(\d+) for the header "([^"]+)"$/, function (errorNumber, fieldName) {
    let elem = browser.element(`#${fieldName}_error_code`);
    let foundErrorCode = elem.getAttribute('value');
    let expectedErrorCode = "DR" + errorNumber;
    return expect(expectedErrorCode).toEqual(foundErrorCode);
});


  this.Then(/^I open row correction details for error DR(\d+)$/, function (errorCode) {
    return browser.click(`//a[contains(@href, 'id=${errorCode}')]`);
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
