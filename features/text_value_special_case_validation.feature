Feature: Submit files with either Text_Value or Value data
  As a user I want to successfully submit files where value or text value are required


  Business logic
  One of Value or Txt_Value must be specified
  Only one of Value or Txt_Value can be specified at once
  If Value is used, Unit must be used
  If Txt_Value is used, Unit cannot be used

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Successfully submit a valid file where either text value or value are given
    And I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename                                             |
      | CUKE7025_Text_Value_No_Value_with_header_PASS.csv    |
      | CUKE7026_Text_Value_No_Value_with_no_header_PASS.csv |
      | CUKE7027_Value_No_Text_Value_with_header_PASS.csv    |
      | CUKE7028_Value_No_Text_Value_with_no_header_PASS.csv |



