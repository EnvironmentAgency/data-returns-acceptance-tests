module.exports = function() {

  //------------ These check that the correct DR error message is displayed ------------------

  //DR9000
  this.Then(/^Permit number correction message "([^"]*)" is displayed$/, function(EA_ID) {
    return expect(browser.getValue('#EA_ID_error_code')).toEqual(EA_ID);
  });

  //DR9010
  this.Then(/^Return Type correction message "([^"]*)" is displayed$/, function(Rtn_Type) {
    return expect(browser.getValue('#Rtn_Type_error_code')).toEqual(Rtn_Type);
  });

  //DR9020
  this.Then(/^Monitoring Date correction message "([^"]*)" is displayed$/, function(Mon_Date) {
    return expect(browser.getValue('#Mon_Date_error_code')).toEqual(Mon_Date);
  });

  //DR9030
  this.Then(/^Parameter correction message "([^"]*)" is displayed$/, function(Parameter) {
    return expect(browser.getValue('#Parameter_error_code')).toEqual(Parameter);
  });

  //DR9040
  this.Then(/^Value correction message "([^"]*)" is displayed$/, function(Value) {
    return expect(browser.getValue('#Value_error_code')).toEqual(Value);
  });

  //DR9050
  this.Then(/^Units correction message "([^"]*)" is displayed$/, function(Units) {
    return expect(browser.getValue('#Unit_error_code')).toEqual(Units);
  });

  //DR9060
  this.Then(/^Monitoring Point correction message "([^"]*)" is displayed$/, function(Mon_Point) {
    return expect(browser.getValue('#Mon_Point_error_code')).toEqual(Mon_Point);
  });

  //DR9070
  this.Then(/^Monitoring Period correction message "([^"]*)" is displayed$/, function(Mon_Period) {
    return expect(browser.getValue('#Mon_Period_error_code')).toEqual(Mon_Period);
  });

  //DR9080
  this.Then(/^Text Value correction message "([^"]*)" is displayed$/, function(Txt_Value) {
    return expect(browser.getValue('#Txt_Value_error_code')).toEqual(Txt_Value);
  });

  //DR9080 Boolean values in Txt_Value ------
  this.Then(/^Text value data correction message (.*) is displayed$/, function(DRref) {
    return expect(browser.getValue('#Txt_Value_error_code')).toEqual(DRref);
  });

  this.Then(/^Text value additional details message (.*) is displayed$/, function(DRref) {
    return expect(browser.getValue('#error_code')).toEqual(DRref);
  });
  //---------------------

  //DR9090
  this.Then(/^Reference Period correction message "([^"]*)" is displayed$/, function(Ref_Period) {
    return expect(browser.getValue('#Ref_Period_error_code')).toEqual(Ref_Period);
  });

  //DR9100
  this.Then(/^Method Standard correction message "([^"]*)" is displayed$/, function(Meth_Std) {
    return expect(browser.getValue('#Meth_Stand_error_code')).toEqual(Meth_Std);
  });

  //----MISSING
  //DR9110
  this.Then(/^Site Name correction message "([^"]*)" is displayed$/, function(Site_Name) {
    return expect(browser.getValue('#Site_Name_error_code')).toEqual(Site_Name);
  });

  //DR9120
  this.Then(/^Sample Reference correction message "([^"]*)" is displayed$/, function(Smpl_Ref) {
    return expect(browser.getValue('#Smpl_Ref_error_code')).toEqual(Smpl_Ref);
  });

  //DR9130
  this.Then(/^Sampled By correction message "([^"]*)" is displayed$/, function(Smpl_By) {
    return expect(browser.getValue('#Smpl_By_error_code')).toEqual(Smpl_By);
  });

  //DR9140
  this.Then(/^Comments correction message "([^"]*)" is displayed$/, function(Comments) {
    return expect(browser.getValue('#Comments_error_code')).toEqual(Comments);
  });

  //DR9150
  this.Then(/^CiC correction message "([^"]*)" is displayed$/, function(CiC) {
    return expect(browser.getValue('#CiC_error_code')).toEqual(CiC);
  });

  //DR9160
  this.Then(/^CAS correction message "([^"]*)" is displayed$/, function(ref) {
    return expect(browser.getValue('#CAS_error_code')).toEqual(ref);
  });

  //DR9170
  this.Then(/^RD Code correction message "([^"]*)" is displayed$/, function(RDCode) {
    return expect(browser.getValue('#RD_Code_error_code')).toEqual(RDCode);
  });

  //------------- Specified ID additional error details -----------------

  //DR9000
  this.Then(/^Permit number additional details message "([^"]*)" is displayed$/, function(EA_ID) {
    return expect(browser.getValue('#EA_ID_error_code')).toEqual(EA_ID);
  });

  //DR9020
  this.Then(/^Monitoring Date additional details message "([^"]*)" is displayed$/, function(Mon_Date) {
    return expect(browser.getValue('#Mon_Date_error_code')).toEqual(Mon_Date);
  });

  //----- Not currently required as ID is generic ---------

  //this.Then(/^Return Type additional details message "([^"]*)" is displayed$/, function (Rtn_Type) {
  //return expect(browser.getValue('#Rtn_Type_error_code')).toEqual(Rtn_Type);
  //});

  //this.Then(/^Value additional details message "([^"]*)" is displayed$/, function (Value) {
  //return expect(browser.getValue('#Value_error_code')).toEqual(Value);
  //});

  //this.Then(/^Units additional details message "([^"]*)" is displayed$/, function (Units) {
  //return expect(browser.getValue('#Unit_error_code')).toEqual(Units);
  //});

  //this.Then(/^Monitoring Period additional details message "([^"]*)" is displayed$/, function (Mon_Period) {
  //return expect(browser.getValue('#Mon_Period_error_code')).toEqual(Mon_Period);
  //});

  //------ Generic additional details where specific error_code ID is not defined -------------

  this.Then(/^additional details correction message "([^"]*)" is displayed$/, function(addDetails) {
    return expect(browser.getValue('#error_code')).toEqual(addDetails);
  });

  //---------TEST-------
  //DR9080
  //this.Then(/^Text value data correction message "([^"]*)" is displayed$/, function (Txt_Value) {
  //return expect(browser.getValue('#Txt_Value_error_code')).toEqual(Txt_Value);
  //});




}
