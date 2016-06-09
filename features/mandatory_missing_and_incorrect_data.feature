Feature: Check file contents for Missing and incorrect mandatory data
  As an user I want to be notified when mandatory data
  is Missing and incorrect and its location within the file

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Mandatory Fields --------------------------
  
  Scenario Outline: For MANDATORY fields check that the correct error message is displayed
    for records where data is Missing and incorrect
    Given I choose file <Filename>
    And I click "Check for errors"
    And Column field shows <Header>
    And Error column shows as <Error>
    Then I click "See details of which rows to correct" link

    Examples:
      | Filename | DRref | Header | Error |
      | CUKE3001_EA_ID_M_and_I_Error.csv | DR9000 | EA_ID | Missing and incorrect |
      | CUKE3002_Return_Type_M_and_I_Error.csv | DR9010 | Rtn_Type | Missing and incorrect |
      | CUKE3003_Monitoring_Point_M_and_I_Error.csv | DR9060 | Mon_Point | Missing and incorrect |
      | CUKE3004_Monitoring_Date_M_and_I_Error.csv | DR9020 | Mon_Date | Missing and incorrect |
      | CUKE3005_Parameter_M_and_I_Error.csv | DR9030 | Parameter | Missing and incorrect |
      | CUKE3006_Value_M_and_I_Error.csv | DR9040 | Value | Missing and incorrect |
      | CUKE3007_Unit_M_and_I_Error.csv | DR9050 | Unit | Missing and incorrect |
