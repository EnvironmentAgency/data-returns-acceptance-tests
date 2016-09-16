Feature: Submit files where all data passes validation
  As a user I want to successfully submit files which are
  correctly structured and all data is valid

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"
    And I choose to "Continue"
    And I input an email address
    Then I choose to "Send email"
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I choose to "Send code"
    Then I am on the "Send your files" page
    And I choose to "Accept and send files"
    Then I see the page header "Data return sent"

    Examples:
      | Filename                                                          |
      | CUKE000_SUCCESS_NO_ERRORS.csv                                     |
      | CUKE003_Multiple_Permit_Formats_Single Rtn_Type_PASS.csv          |
      | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv                 |
      | CUKE009_Multi_Permits_AA_GZ_PASS.csv                              |
      | CUKE010_Multi_Permits_HA_ZZ_PASS.csv                              |
      | CUKE011_Multi_Permits_10_69_PASS.csv                              |
      | CUKE012_Multi_Permits_70_PASS.csv                                 |
      | CUKE014_ALL_Fields_Multi_Return_Types_and_Permit_Formats_PASS.csv |