module.exports = function() {

  this.Then('your data return is incomplete error message is generated', function() {
    browser.waitForExist('#T-/file/choose-53');
  });

  this.Then('Your file contains unrecognisable field headings message is generated', function() {
    browser.waitForExist('#T-/file/choose-51');
  });

  this.Then('A problem with your CSV file message is generated', function() {
    browser.waitForExist('#T-/file/choose-50');
  });

}
