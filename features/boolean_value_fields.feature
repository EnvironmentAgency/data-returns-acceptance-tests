Feature: Submit files where data comprises of Boolean values
  As a user I want to successfully submit files where specific
  fields contain text (Yes/No/True/False) values

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file where the Text Value field has a value
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename |
      | CUKE7001_OPT_Text_Value_Boolean_YES_PASS.csv      |
      | CUKE7002_Text_Value_Boolean_ALL_PASS.csv          |
      | CUKE7006_OPT_Text_Value_Boolean_no_PASS.csv       |
      | CUKE7010_OPT_Text_Value_Boolean_FALSE_PASS.csv    |
      
    

  Scenario Outline: Check that the correct error message is displayed for non controlled list values
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Correction details contains error for <DRref> for the header "<Header>"
    And I expect the column heading for error <DRref> to be "<Header>"
    And I expect the error type for error <DRref> to be "<Error>"
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename                                   | DRref  | Error     | Header    |
      | CUKE7015_OPT_Text_Value_Boolean_y_FAIL.csv | DR9080 | Incorrect | Txt_Value |

        Scenario Outline: Successfully submit a valid file where the Text Value field references a comment
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename                                 |
      | CUKE7023_Text_Value_has_comment_PASS.csv |
      | CUKE7023b_Text_Value_has_comment_PASS.csv|


  Scenario Outline: Check that the correct error message is displayed for missing comment
    * I choose boolean file <Filename> to upload
    * I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    * I open the file details for <Filename>
    * I expect the column heading for error <DRref> to be "<Header>"
    * I expect the error type for error <DRref> to be "<Error>"
    * Correction details contains error for <DRref> for the header "<Header>"
    * I open row correction details for error <DRref>
    * I see the page header "Details of errors"
    * I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename                                     | DRref   | Header    | Error     |
      | CUKE7024_Text_Value_has_no_comment_FAIL.csv  | DR9140  | Comments  | Missing   |
      | CUKE7024b_Text_Value_has_no_comment_FAIL.csv | DR9140  | Comments  | Missing   |
      
