module.exports = function() {

//---------------------- EMPTY FILE ---------------

this.Then('an empty file error message is generated', function () {
  browser.waitForExist('#T-/file/choose-51');
});

//----------------- UNRECOGNISED PERMIT --------

this.Then(/^a valid initial error message is displayed "([^"]*)"$/, function (drvalue) {
  return expect(browser.getValue('#error_code')).toEqual(drvalue);
});

//---------------------- NON CSV ---------------

this.Then('the text "Your file isn’t saved as CSV" is displayed', function () {
    browser.waitForExist('#T-/file/choose-52');
});

//----------------------- VIRUS CHECK ----------

this.Then('a security fail error message is generated', function () {
  browser.waitForExist('#T-/file/choose-51');
});

//------------------------- MULTIPLE PERMITS ------------------

this.Then('a multiple permit numbers error message is generated', function () {
  browser.waitForExist('#T-/file/choose-49');
});

//---------------- Large File - Too Large ------------
this.Then('a file is too large message is generated', function () {
  browser.waitForExist('#T-/file/choose-51');
  });

//-------------- Incorrect structure -------------
this.Then('a incorrect structure message is displayed', function () {
  browser.waitForExist('#T-/file/choose-51');
  });

}
