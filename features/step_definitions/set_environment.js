module.exports = function() {

//Set environment to run tests against

this.Given(/^I am on the Data Returns page$/, function () {
  //TEST
    //return this.browser.url('https://dr-test.envage.co.uk/start');

//-----------------------------------------------------------------------------------------
//DEV
    return this.browser.url('https://dr-dev.envage.co.uk/start');

//-----------------------------------------------------------------------------------------
//PRE_PROD
  //return this.browser.url('https://data-returns-preprod.envage.co.uk/01-start/01-start');

//------------------------------------------------------------------------------------------
//PROD
  //return this.browser.url('http://dr-prod.envage.co.uk');

//------------------------------
//LOCAL
  //return this.browser.url('http://localhost:3000/index');

});

}
