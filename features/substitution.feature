Feature: Submit files with alias alternative values
  As a user I want to successfully submit files which have
  alternative values to what is the prefered reference
  so that I can use values understandable in my company

  Scenario Outline: Alias values are correctly validated
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    And I confirm my details are correct
    Then I submit an email address
    Then I submit the confirmation code
    And I choose to send my files now
    Then My returns have been sent

    Examples:
      | Filename               |
      | ALIAS_SUBSTITUTION.csv |


  Scenario Outline: Alternative IDs show and substitute correct EA_ID
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see that <alternate_id> has been substituted to <ea_id>

    Examples:
      | Filename               | alternate_id | ea_id |
      | EA_ID_SUBSTITUTION.csv | E081         | 70601 |
      # | EA_ID_SUBSTITUTION_2.csv    | sp3734tr          | 70601 |


  Scenario Outline: Correct EA_ID is used where alternatives are available
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see that the EA_ID <ea_id> has been used

    Examples:
      | Filename                 | ea_id |
      | EA_ID_SUBSTITUTION_3.csv | 70601 |

  Scenario Outline: Incorrect characters are substituted for known correct characters
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename                   |
      | CHARACTER_SUBSTITUTION.csv |