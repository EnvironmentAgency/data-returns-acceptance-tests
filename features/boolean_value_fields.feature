Feature: Submit files where data comprises of Boolean values
  As a user I want to successfully submit files where specific
  fields contain Boolean (Yes/No/True/False) values

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file where the Text Value field holds a Boolean value
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename |
      | CUKE7001_OPT_Text_Value_Boolean_YES_PASS.csv      |
      | CUKE7004_OPT_Text_Value_Boolean_NO_PASS.csv       |
      | CUKE7006_OPT_Text_Value_Boolean_no_PASS.csv       |
      | CUKE7007_OPT_Text_Value_Boolean_TRUE_PASS.csv     |
      | CUKE7010_OPT_Text_Value_Boolean_FALSE_PASS.csv    |
      | CUKE7012_OPT_Text_Value_Boolean_false_PASS.csv    |
      | CUKE7013_OPT_Text_Value_Boolean_1_FAIL.csv        |
    

  Scenario Outline: Check that the correct error message is displayed for non Boolean data
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
      # | CUKE7013_OPT_Text_Value_Boolean_1_FAIL.csv | DR9080 | Incorrect |
