Feature: Submit files with alias alternative values
  As a user I want to successfully submit files which have
  alternative values to what is in the controlled lists
  so that I can use recognised terms that are not in the controlled lists

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
      | Filename                        |
      | CUKE4043_ALIAS_SUBSTITUTION.csv |
      
