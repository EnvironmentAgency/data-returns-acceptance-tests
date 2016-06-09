Feature: Check file contents for incorrect MANDATORY data
  As an user I want to be notified when mandatory data
  is Incorrect and its location within the file

  Background:
    Given I am on the Data Returns page
    And I see the "Send landfill data returns" page
    Then I select "Start now" button

  #------------------ Mandatory Fields --------------------------
  @watch
  Scenario Outline: For MANDATORY fields check that the correct error message is displayed
    for records where data is Incorrect
    Given I choose file <Filename>
    And I click "Check for errors"
    And Column field shows <Header>
    And Error column shows as <Error>
    Then I click "See details of which rows to correct" link

    Examples:
      | Filename | DRref | Header | Error |
      | CUKE1001_EA_ID_Incorrect_error.csv | DR9000 | EA_ID | Incorrect |
      | CUKE1002_Return_Type_Incorrect_Error.csv | DR9010 | Rtn_Type | Incorrect |
      | CUKE1003_Monitoring_Point_Incorrect_Error.csv | DR9060 | Mon_Point | Incorrect |
      | CUKE1004_Monitoring_Date_Incorrect_Error.csv | DR9020 | Mon_Date | Incorrect |
      | CUKE1005_Parameter_Incorrect_Error.csv | DR9030 | Parameter | Incorrect |
      | CUKE1006_Value_Incorrect_Error.csv | DR9040 | Value | Incorrect |
      | CUKE1007_Unit_Incorrect_Error.csv | DR9050 | Unit | Incorrect |
