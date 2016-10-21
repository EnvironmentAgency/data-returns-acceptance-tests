module.exports = function () {
    var fileChooserXpath = "//input[@type='file']";

    this.Then(/^I choose file (.*) to upload$/, function (filename) {
        // Wait for the uploader to become present and upload a file (without waiting we get random errors when using firefox)
        let uploader = browser.element(fileChooserXpath);
        uploader.waitForExist(5000);
        browser.chooseFile(fileChooserXpath, `features/support/files/${filename}`);
    });
};