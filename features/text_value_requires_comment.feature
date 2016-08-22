Feature: Submit files where text value requires comments
  As a user I want to successfully submit files where text value 
  fields contain reference comments

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Successfully submit a valid file where the Text Value field references a comment
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename |
      | CUKE7023_Text_Value_has_comment_PASS.csv |


  Scenario Outline: Check that the correct error message is displayed for missing comment
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Validation information contains error for <DRref>
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename | DRref |
      | CUKE7024_Text_Value_has_no_comment_FAIL.csv | DR9140 |
