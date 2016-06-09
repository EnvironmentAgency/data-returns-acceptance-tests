Feature: Check file contents for missing mandatory data
  As an user I want to be notified when mandatory data
  is Missing and its location within the file

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I select "Start now" button

  #------------------ Mandatory Fields --------------------------
  @watch
  Scenario Outline: For MANDATORY fields check that the correct error message is displayed
    for records where data is Missing
    Given I choose file <Filename>
    And I click "Check for errors"
    And Column field shows <Header>
    And Error column shows as <Error>
    Then I click "See details of which rows to correct" link

    Examples:
      | Filename | DRref | Header | Error | DRef | DetError |
      | CUKE2001_EA_ID_Missing_Error.csv | DR9000 | EA_ID | Missing | Missing |
      | CUKE2002_Return_Type_Missing_Error.csv | DR9010 | Rtn_Type | Missing | Missing |
      | CUKE2003_Monitoring_Point_Missing_Error.csv | DR9060 | Mon_Point | Missing | Missing |
      | CUKE2004_Monitoring_Date_Missing_Error.csv | DR9020 | Mon_Date | Missing | Missing |
      | CUKE2005_Parameter_Missing_Error.csv | DR9030 | Parameter | Missing | Missing |
      | CUKE2006_Value_Missing_Error.csv | DR9040 | Value | Missing | Missing |
      | CUKE2007_Unit_Missing_Error.csv | DR9050 | Unit | Missing | Missing |
