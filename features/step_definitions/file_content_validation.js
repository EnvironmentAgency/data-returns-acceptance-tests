module.exports = function() {

  //------------ First level error details table ----------

  this.Given(/^Column field shows (.*)$/, function(Header) {
    return expect(browser.pause(500))
    expect(browser.getText('#T-/correction/table-60')).toEqual(Header);
  });

  this.Given(/^Error column shows as (.*)$/, function(Error) {
    return expect(browser.pause(500))
    expect(browser.getText('#T-/correction/table-62')).toEqual(Error);
  });

  //------- Display more details page for error ------

  this.Then(/^I click "See details of which rows to correct" link$/, function() {
    return browser.click('#T-/correction/table-66');
  });

  this.Then('details Error column shows as Missing', function() {
    browser.waitForExist("=Missing");
  });

}
