Feature: Submit files where all data passes validation
  As a user I want to successfully submit files which are
  correctly structured and all data is valid

  Background:
    Given I am on the landing page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I am on the confirm details page
    And I confirm my details are correct
    And I submit an email address
    Then I submit the confirmation code
    Then I am on the send your files page
    And I choose to send my files now
    Then I am on the data returns sent page

    Examples:
      | Filename                                                          |
      | multiple_file_upload_1.csv                                        |
      | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv                 |

  Scenario Outline: For OPTIONAL fields check that null values are accepted
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I am on the confirm details page

    Examples:
      | Filename                              |
      | successful_submissions_OPT_Ref_Period_Null_PASS.csv |
      | successful_submissions_OPT_Mon_Period_NULL_PASS.csv |
      | successful_submissions_OPT_Comments_NULL_PASS.csv   |
      | successful_submissions_OPT_Meth_Stand_NULL_PASS.csv |
      | successful_submissions_OPT_CiC_NULL_PASS.csv        |
