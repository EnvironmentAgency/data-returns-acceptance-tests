module.exports = function() {

this.Then(/^I see "([^"]*)" link 1$/, function (arg1) {
  browser.waitForText('#T-/start-51');
});

this.Then(/^I see "([^"]*)" link 2$/, function (arg1) {
  browser.waitForText('#T-/start-57');
});

this.Then(/^I see "([^"]*)" link 3$/, function (arg1) {
  browser.waitForText('#T-/start-61');
});

this.Then("I see Scotland link", function () {
  browser.waitForText('#T-/start-70');
});

this.Then("I see Wales link", function () {
  browser.waitForText('#T-/start-72');
});

this.Then("I see Northern Ireland link", function () {
  browser.waitForText('#T-/start-73');
});

}
