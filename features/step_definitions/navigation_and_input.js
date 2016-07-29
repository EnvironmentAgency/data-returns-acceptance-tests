module.exports = function() {

  this.Given(/^I am on the Data Returns page$/, function() {
    return this.browser.url('/start');
  });

  //------------- Page check navigation -----------------------

  this.Then(/^I see the page "([^"]*)"$/, function(heading) {
    return expect(browser.getText('#T-/file/confirm-47')).toEqual(heading);
  });

  this.Then(/^I am on the "([^"]*)" page$/, function(heading) {
    expect(browser.getText('h1')).toEqual(heading);
  });

  this.Then(/^I am on the last page "([^"]*)"$/, function(heading) {
    return expect(browser.pause(500))
    expect(browser.getText('h1')).toEqual(heading);
  });

  this.Then(/^I see the page header "([^"]*)"$/, function(heading) {
    return expect(browser.getText('.heading-xlarge')).toEqual(heading);
  });

  //----------------------Button press -------------

  this.Then(/^I start my submission$/, function() {
    return browser.click('.button-get-started');
  });

  this.Then(/^I select "([^"]*)" button$/, function(button) {
    return browser.click('.button');
  });

  this.Then(/^I click "([^"]*)"$/, function(heading) {
    return browser.click('#check-for-errors-btn');
  });

  this.Then(/^I click "([^"]*)" button$/, function(button) {
    return browser.click('#nextBtn', "=Send authentication email");
  });

  this.Then(/^I click on the "([^"]*)" button$/, function(button) {
    return browser.click('.button');
  });

  //--------- Submit more files (last page)-------------

  this.Then(/^I click the link "([^"]*)"$/, function(link) {
    return browser.click('#T-/file/sent-58');
  });

  //------------------ Input email and code --------------------

  this.Then('I input an email address', function() {
    return browser.setValue('.form-control', "tim.stone.ea@gmail.com");
  });

  this.Then('I enter an invalid email address', function() {
    return browser.setValue('.form-control', "xxxxyz.xyz");
  });

  this.Then('an invalid email error message is shown', function() {
    expect(browser.getText('.error-summary'));
  });

  this.Then('I enter the confirmation code', function() {
    return browser.setValue('.form-control', "1960");
  });
}
