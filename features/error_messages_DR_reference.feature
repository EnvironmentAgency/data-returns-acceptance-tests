Feature: Check that the correct error message is displayed
  As an user I want the correct error message to be displayed
  when a file fails data validation

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Check error DR error message displayed --------------------

  Scenario Outline: Check that the correct error messages are given in the validation pages.
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Validation information contains error for <DRref>
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename | DRref |
      | CUKE4041_OPT_RD_Code_256_Characters_FAIL.csv | DR9170 |
      | CUKE4038_OPT_CAS_256_Characters_FAIL.csv | DR9160 |
      | CUKE4034_OPT_CiC_256_Characters_FAIL.csv | DR9150 |
      | CUKE4027_OPT_Comments_256_Characters_FAIL.csv | DR9140 |
      | CUKE4011_OPT_Smpl_By_256_Characters_FAIL.csv | DR9130 |
      | CUKE4008_OPT__Smpl_Ref_256_Characters_FAIL.csv | DR9120 |
      | CUKE4024_OPT_Site_Name_Special_Characters_FAIL.csv | DR9110 |
      | CUKE4029_OPT_Meth_Stand_Non_Controlled_List_FAIL.csv | DR9100 |
      | CUKE4002_OPT_Ref_Period_Non_Controlled_List_FAIL.csv | DR9090 |
      | CUKE4013_OPT_Text_Value_Non_Controlled_List_FAIL.csv | DR9080 |
      | CUKE4004_OPT_Mon_Period_Non_Controlled_List_FAIL.csv | DR9070 |
      | CUKE1003_Monitoring_Point_Incorrect_Error.csv | DR9060 |
      | CUKE1007_Unit_Incorrect_Error.csv | DR9050 |
      | CUKE1006_Value_Incorrect_Error.csv | DR9040 |
      | CUKE1005_Parameter_Incorrect_Error.csv | DR9030 |
      | CUKE1004_Monitoring_Date_Incorrect_Error.csv | DR9020 |
      | CUKE1002_Return_Type_Incorrect_Error.csv | DR9010 |
      | CUKE1001_EA_ID_Incorrect_error.csv | DR9000 |