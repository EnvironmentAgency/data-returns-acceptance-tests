Feature: Check file contents for incorrect MANDATORY data
  As an user I want to be notified when mandatory data
  is incorrect or missing and its location within the file

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: For MANDATORY fields check that the correct error message is displayed for records where data is Incorrect
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "DATA ERROR"
    When I open the file details for <Filename>
    Then Correction table contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Correct <Header> errors"
    And I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:
      | Filename                                      | DRref  | Header    | Error     |
      | CUKE1001_EA_ID_Incorrect_error.csv            | DR9000 | EA_ID     | Incorrect |
      | CUKE1002_Return_Type_Incorrect_Error.csv      | DR9010 | Rtn_Type  | Incorrect |
      | CUKE1003_Monitoring_Point_Incorrect_Error.csv | DR9060 | Mon_Point | Incorrect |
      | CUKE1004_Monitoring_Date_Incorrect_Error.csv  | DR9020 | Mon_Date  | Incorrect |
      | CUKE1005_Parameter_Incorrect_Error.csv        | DR9030 | Parameter | Incorrect |
      | CUKE1006_Value_Incorrect_Error.csv            | DR9040 | Value     | Incorrect |
      | CUKE1007_Unit_Incorrect_Error.csv             | DR9050 | Unit      | Incorrect |
      | CUKE3009_Incorrect_Site_Name_value_FAIL.csv   | DR9110 | Site_Name | Incorrect |


  Scenario Outline: For MANDATORY fields check that the correct error message is displayed for records where data is Missing and incorrect
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "DATA ERROR"
    When I open the file details for <Filename>
    Then Correction table contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Correct <Header> errors"
    And I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:
      | Filename                                    | DRref  | Header    | Error             |
      | CUKE3001_EA_ID_M_and_I_Error.csv            | DR9000 | EA_ID     | Missing,Incorrect |
      | CUKE3002_Return_Type_M_and_I_Error.csv      | DR9010 | Rtn_Type  | Missing,Incorrect |
      | CUKE3003_Monitoring_Point_M_and_I_Error.csv | DR9060 | Mon_Point | Missing,Incorrect |
      | CUKE3004_Monitoring_Date_M_and_I_Error.csv  | DR9020 | Mon_Date  | Missing,Incorrect |
      | CUKE3005_Parameter_M_and_I_Error.csv        | DR9030 | Parameter | Missing,Incorrect |
      # | CUKE3006_Value_M_and_I_Error.csv            | DR9040 | Value     | Missing,Incorrect |
      | CUKE3007_Unit_M_and_I_Error.csv             | DR9050 | Unit      | Missing,Incorrect |
      | CUKE3010_Site_Name_value_M_and_I.csv        | DR9110 | Site_Name | Missing,Incorrect |

  Scenario Outline: For MANDATORY fields check that the correct error message is displayed for records where data is Missing
    Given I choose validation test file <Filename> to upload
    Then  I expect the file status for <Filename> to be "DATA ERROR"
    When  I open the file details for <Filename>
    Then  Correction table contains error for <DRref> for the header "<Header>"
    Then  I open row correction details for error <DRref>
    And   I see the page header "Correct <Header> errors"
    And   I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:
      | Filename                                    | DRref  | Header    | Error   |
      | CUKE2001_EA_ID_Missing_Error.csv            | DR9000 | EA_ID     | Missing |
      | CUKE2002_Return_Type_Missing_Error.csv      | DR9010 | Rtn_Type  | Missing |
      | CUKE2003_Monitoring_Point_Missing_Error.csv | DR9060 | Mon_Point | Missing |
      | CUKE2004_Monitoring_Date_Missing_Error.csv  | DR9020 | Mon_Date  | Missing |
      | CUKE2005_Parameter_Missing_Error.csv        | DR9030 | Parameter | Missing |
      # | CUKE2006_Value_Missing_Error.csv              | DR9040 | Value     | Missing |
      | CUKE2007_Unit_Missing_Error.csv             | DR9050 | Unit      | Missing |
      | CUKE3008_Missing_Site_Name_value_FAIL.csv   | DR9110 | Site_Name | Missing |

