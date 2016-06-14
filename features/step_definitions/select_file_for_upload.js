module.exports = function() {

  this.Given(/^I choose date file (.*)$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Date_format/${filename}`);
  });

  this.Given(/^I choose header file (.*) to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Header_format/${filename}`);
  });

  this.Then(/^I choose initial file "([^"]*)" to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Initial_Validation/${filename}`);
  });

  //this.Given(/^I choose file "([^"]*)"$/, function(filename) {
    //browser.chooseFile("#file-select-button", `features/support/files/File_Validation/${filename}`);
  //});

  //this.Given(/^I choose multiple file (.*)$/, function(filename) {
    //browser.chooseFile("#file-select-button", `features/support/files/Initial_Validation/${filename}`);
  //});

  this.Given(/^I choose multiple files "([^"]*)"$/, function (filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Initial_Validation/${filename}`);
  });

  this.Given(/^I choose Controlled List file (.*) to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Initial_Validation/${filename}`);
  });

  this.Given(/^I choose successfull file (.*) to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Initial_Validation/${filename}`);
  });

  this.Given(/^I choose failed file "([^"]*)" to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/File_Validation/${filename}`);
  });

  this.Given(/^I choose boolean file (.*) to upload$/, function(filename) {
    browser.chooseFile("#file-select-button", `features/support/files/Boolean_values/${filename}`);
  });

  this.Given(/^I choose file (.*)$/, function (filename) {
    browser.chooseFile("#file-select-button", `features/support/files/File_Validation/${filename}`);
  });

}
