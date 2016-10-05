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
    Then I am on the "Send your data" page
    And I choose to "Accept and send"
    Then I see the page header "Data returns sent"

    Examples:
      | Filename                                                          |
      | CUKE000_SUCCESS_NO_ERRORS.csv                                     |
      # | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv                 |
