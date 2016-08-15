function getUploadRowSelector(filename) {
  // Selector to find a row container div which contains another div with the correct filename
  return `//div[@id="upload-list"]//div[child::div[@class='filename']/text() = '${filename}']`;
}

function getUploadFileStatusSelector(filename) {
  // Selector to find the status text for the file upload row
  return `${getUploadRowSelector(filename)}/div[@class='status']`;
}
function getUploadFileMoreDetailsLinkSelector(filename) {
  // Selector to find the more details link for the file upload row
  return `${getUploadRowSelector(filename)}//div[@class='details']/a`;
}
function getUploadFileRemoveLinkSelector(filename) {
  // Selector to find the submit button on the remove file form in the upload list
  return `${getUploadRowSelector(filename)}/div[@class='remove']//input[@type='submit']`;
}

module.exports = function() {
  //------------- Page check navigation -----------------------
  this.Given(/^I am on the start page$/, function() {
    return this.browser.url('/start');
  });

  this.Then(/^I am on the "([^"]*)" page$/, function(heading) {
    expect(browser.getText('h1')).toEqual(heading);
  });

  this.Then(/^I see the page header "([^"]*)"$/, function(heading) {
    return expect(browser.getText('//main//h1[1]')).toEqual(heading);
  });

  //---------------------- Functions specific to the file upload table -------------
  this.Then(/^I expect the file status for (.*) to be "([^"]*)"$/, function (filename, message) {
    let fileStatusSelector = getUploadFileStatusSelector(filename);
    browser.waitUntil(function () {
      return browser.getText(fileStatusSelector) === message
    }, 5000, 'expected file to be uploaded and checked within 5s', 250);
  });
  this.Then(/^I open the file details for (.*)$/, function (filename) {
    return browser.click(getUploadFileMoreDetailsLinkSelector(filename));
  });

  this.Then(/^I finish uploading files and continue$/, function () {
    return browser.click("#continue-btn");
  });
  this.Then(/^I am unable to continue/, function () {
    return expect(browser.element("#continue-btn").getAttribute("disabled")).not.toBeNull();
  });



  //----------------------Button press -------------
  this.Then(/^I start my submission$/, function() {
    return browser.click('.button-get-started');
  });

  this.Then(/^I choose to "([^"]*)"$/, function(button) {
    let selector = `//*[contains(@class, "button")][@value="${button}" or text() = "${button}"]`;
    return browser.click(selector);
  });


  //------------------ Input email and code --------------------

  this.Then('I input an email address', function() {
    var randomnumber = Math.floor(Math.random() * (1 - 1000 + 1)) + minimum;
    return browser.setValue('.form-control', "tim.stone.ea+" + randomnumber + "@gmail.com");
  });

  // this.Then('I input another email address', function() {
  //   return browser.setValue('.form-control', "tim.stone.ea+test@gmail.com");
  // });

  this.Then('I enter an invalid email address', function() {
    return browser.setValue('.form-control', "xxxxyz.xyz");
  });

  this.Then('an invalid email error message is shown', function() {
    expect(browser.getText('.error-summary'));
  });

  this.Then('I enter the confirmation code', function() {
    return browser.setValue('.form-control', "1960");
  });
};