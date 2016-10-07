module.exports = function() {
  var fileChooserXpath = "//input[@type='file']";

  this.Given(/^I choose date file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/Date_format/${filename}`);
  });
  this.Given(/^I choose header file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/Header_format/${filename}`);
  });
  this.Then(/^I choose file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/${filename}`);
  });
  this.Given(/^I choose validation test file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/File_Validation/${filename}`);
  });
  this.Given(/^I choose boolean file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/Boolean_values/${filename}`);
  });
};