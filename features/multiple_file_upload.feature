Feature: Multiple file uploads
  As a user I want to successfully submit multiple files in one submission

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    And I choose file <Filename2> to upload
    And I choose file <Filename3> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    And I expect the file status for <Filename2> to be "READY TO SEND"
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
      | Filename                     | Filename2                  | Filename3                  |
      | multiple_file_upload_1.csv   | multiple_file_upload_2.csv | multiple_file_upload_3.csv |
      
