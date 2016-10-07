Feature: Submit files where all data passes validation
  As a user I want to successfully submit files which are
  correctly structured and all data is valid

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"
    And I choose to "Continue"
    And I input an email address
    Then I choose to "Send email"
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I choose to "Send code"
    Then I am on the "Send your data" page
    And I choose to "Accept and send"
    Then I see the page header "Data returns sent"

    Examples:
      | Filename                                                          |
      | SUCCESS_NO_ERRORS.csv                                             |
      # | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv                 |

  Scenario Outline: For OPTIONAL fields check that null values are accepted
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                              |
      | CUKE4001_OPT_Ref_Period_Null_PASS.csv |
      | CUKE4006_OPT_Mon_Period_NULL_PASS.csv |
      | CUKE4009_OPT__Smpl_Ref_NULL_PASS.csv  |
      | CUKE4012_OPT_Smpl_By_NULL_PASS.csv    |
      | CUKE4028_OPT_Comments_NULL_PASS.csv   |
      | CUKE4032_OPT_Meth_Stand_NULL_PASS.csv |
      | CUKE4035_OPT_CiC_NULL_PASS.csv        |
      | CUKE4039_OPT_CAS_NULL_PASS.csv        |
      | CUKE4042_OPT_RD_Code_NULL_PASS.csv    |