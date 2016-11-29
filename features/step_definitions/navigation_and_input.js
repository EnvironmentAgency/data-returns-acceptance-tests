'use strict';

let StartPage = require("../support/pages/start.page");
let UploadPage = require("../support/pages/upload.page");
let ConfirmPage = require("../support/pages/confirm.page");
let EmailPage = require("../support/pages/email.page");
let PinPage = require("../support/pages/pin.page");
let SendPage = require("../support/pages/send.page")
let SentPage = require("../support/pages/sent.page")

const waitForNavigation = require("../support/lib/wait-for-navigation-on-action");



module.exports = function () {

    this.Before(function () {
        StartPage.open();
    });

    //------------- Page check navigation -----------------------
    this.defineStep(/^I am on the start page$/, function () {
        StartPage.open();
    });

    //----------------------Button press -------------
    this.defineStep(/^I start my submission$/, function () {
        StartPage.continue();
    });

    this.defineStep(/^I am on the landing page$/, function() {
       StartPage.checkOpen();
    });

    this.defineStep(/^I am on the upload page$/, function() {
        UploadPage.checkOpen();
    });
    this.defineStep(/^I am on the confirm details page$/, function() {
        ConfirmPage.checkOpen();
    });
    this.defineStep(/^I am on the email page$/, function() {
        EmailPage.checkOpen();
    });
    this.defineStep(/^I am on the pin page$/, function() {
        PinPage.checkOpen();
    });
    this.defineStep(/^I am on the send your files page$/, function() {
        SendPage.checkOpen();
    });
    this.defineStep(/^I am on the data returns sent page$/, function() {
        SentPage.checkOpen();
    });


    //------------- Page url navigation -----------------------
    this.defineStep(/^I navigate to URL "([^"]*)"$/, function (url) {
        waitForNavigation(function() {
            browser.url(url);
        });
    });

    this.defineStep(/^I go back in browser history$/, function () {
        waitForNavigation(function() {
            return browser.back();
        });
    });

    this.defineStep(/^I am on the "([^"]*)" page$/, function (expectedHeading) {
        let heading = browser.element('h1');
        let text = heading.getText();
        text.should.equal(expectedHeading);
    });

    this.defineStep(/^I see the page header "([^"]*)"$/, function (expectedHeading) {
        let heading = browser.element('//main//h1');
        let text = heading.getText();
        text.should.equal(expectedHeading);
    });

    //---------------------- Functions specific to the file upload table -------------
    this.defineStep(/^I expect the file status for (.*) to be "([^"]*)"$/, function (filename, expectedStatus) {
        UploadPage.ensureFileStatusEqual(filename, expectedStatus);
    });

    this.defineStep(/^I open the file details for (.*)$/, function (filename) {
        UploadPage.openFileDetails(filename);
    });

    this.defineStep(/^I finish uploading files and continue$/, function () {
        UploadPage.continue();
    });

    this.defineStep(/^I am unable to continue/, function () {
        UploadPage.ensureCantContinue();
    });


    this.defineStep(/^I choose to "([^"]*)"$/, function (buttonText) {
        waitForNavigation(function() {
            let button = browser.element(`//*[contains(@class, "button")][@value="${buttonText}" or text() = "${buttonText}"]`);
            button.click();
        });
    });

    this.defineStep(/^I click the link "([^"]*)"$/, function (linkText) {
        waitForNavigation(function() {
            let selector = `//a[contains(text(), "${linkText}")]`;
            return browser.click(selector);
        });
    });

    //------------------ Input email and code --------------------
    this.defineStep('I submit an email address', function () {
        EmailPage.submitEmail('tim.stone.ea+' + Math.round(Math.random() * 1000) + '@gmail.com');
    });
    this.defineStep('I submit an invalid email address', function () {
        EmailPage.submitEmail("XXXX");
    });
    this.defineStep('I don\'t enter an email address', function () {
        EmailPage.continue();
    });
    this.defineStep('I am told the email address is invalid', function () {
        EmailPage.ensureErrorShown();
    });

    this.defineStep('I submit the confirmation code', function () {
        PinPage.submitPin("1960");
    });
    this.defineStep('I submit an invalid pin number', function () {
        PinPage.submitPin("xxxxyz.xyz");
    });
    this.defineStep('I don\'t enter a pin number', function () {
        PinPage.submitPin("");
    });

    this.defineStep('I choose to send my files now', function () {
        SendPage.continue();
    });


    this.defineStep(/^an error message is shown$/, function () {
        let errorSummaryText = browser.getText('.error-summary');
        errorSummaryText.should.not.be.null;
    });

    this.defineStep(/^I've chosen my data to return$/, function () {
        let filename = "SUCCESS.csv";
        StartPage.open();
        StartPage.continue();
        UploadPage.upload(filename);
        UploadPage.ensureFileStatusEqual(filename, "READY TO SEND");
        UploadPage.continue();
    });
};