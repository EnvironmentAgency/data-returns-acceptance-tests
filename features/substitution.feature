  Feature: Submit files with alias alternative values
  As a user I want to successfully submit files which have
  alternative values to what is the prefered reference
  so that I can use values understandable in my company

  Background:
    
    Given I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Alias values are correctly validated
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
      | Filename               |
      | ALIAS_SUBSTITUTION.csv |
      

    Scenario Outline: Alternative IDs show and substitute correct EA_ID
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see that <alternate_id> has been substituted to <ea_id>

    Examples:
      | Filename                    | alternate_id      | ea_id |
      | EA_ID_SUBSTITUTION.csv      | E081              | 70601 |
      | EA_ID_SUBSTITUTION_2.csv    | sp3734tr          | 70601 |


    Scenario Outline: Correct EA_ID is used where alternatives are available
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see that the EA_ID <ea_id> has been used

     Examples:
      | Filename                 | ea_id |
      | EA_ID_SUBSTITUTION_3.csv | 70601 |
