'use strict';
var handlers = function () {
    this.registerHandler('BeforeFeatures', function (features, callback) {
        if (process.env.SANITY_TEST !== 'false') {
            console.log("Running sanity test");
            let file = __dirname + "/sanity_test.html";
            browser.url("file://" + file);
            let testDiv = browser.element("div#sanity-test");
            testDiv.waitForExist(5000);
            if (testDiv.getText() !== "OK") {
                throw new Error("Sanity test failed.  Browser integration not working correctly.");
            }
            console.log("Sanity test passed.\r\n")
        }
        console.log("Features to run: ");
        for (let feature of features) {
            console.log("  - " + feature.getName());
        }
        console.log("\r\n\r\n");

        callback();
    });
    this.registerHandler('AfterFeatures', function (features, callback) {
        callback();
    });
}

module.exports = handlers;