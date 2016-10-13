Feature: Submit files where all data passes validation
  As a user I want to successfully submit files which are
  correctly structured and all data is valid

  Background:
    Given I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"
    And I choose to "Continue"
    And I submit an email address
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I choose to "Send code"
    Then I am on the "Send your data" page
    And I choose to "Accept and send"
    Then I see the page header "Data returns sent"

    Examples:
      | Filename                                                          |
      | multiple_file_upload_1.csv                                        |
      # | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv                 |

  Scenario Outline: For OPTIONAL fields check that null values are accepted
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                              |
      | successful_submissions_OPT_Ref_Period_Null_PASS.csv |
      | successful_submissions_OPT_Mon_Period_NULL_PASS.csv |
      | successful_submissions_OPT__Smpl_Ref_NULL_PASS.csv  |
      | successful_submissions_OPT_Smpl_By_NULL_PASS.csv    |
      | successful_submissions_OPT_Comments_NULL_PASS.csv   |
      | successful_submissions_OPT_Meth_Stand_NULL_PASS.csv |
      | successful_submissions_OPT_CiC_NULL_PASS.csv        |
      | successful_submissions_OPT_CAS_NULL_PASS.csv        |
      | successful_submissions_OPT_RD_Code_NULL_PASS.csv    |