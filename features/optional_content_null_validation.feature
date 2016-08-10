Feature: Check acceptance of files where Optional data fields do not contain data
  As an user I want to be able to submit files which
  do not contain a value for optional data

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Optional Fields ----------------------------------

  Scenario Outline: For OPTIONAL fields check that the correct error message is displayed where data for submitted records is Incorrect
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm your files"

    Examples:
      | Filename | 
      | CUKE4001_OPT_Ref_Period_Null_PASS.csv |
      | CUKE4006_OPT_Mon_Period_NULL_PASS.csv |
      | CUKE4009_OPT__Smpl_Ref_NULL_PASS.csv |
      | CUKE4012_OPT_Smpl_By_NULL_PASS.csv |
      | CUKE4015_OPT_Text_Value_NULL_PASS.csv |
      | CUKE4026_OPT_Site_Name_NULL_PASS.csv |
      | CUKE4028_OPT_Comments_NULL_PASS.csv |
      | CUKE4032_OPT_Meth_Stand_NULL_PASS.csv |
      | CUKE4035_OPT_CiC_NULL_PASS.csv |
      | CUKE4039_OPT_CAS_NULL_PASS.csv |
      | CUKE4042_OPT_RD_Code_NULL_PASS.csv |
