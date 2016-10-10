module.exports = function() {
  var fileChooserXpath = "//input[@type='file']";

  this.Then(/^I choose file (.*) to upload$/, function(filename) {
    browser.chooseFile(fileChooserXpath, `features/support/files/${filename}`);
  });
};