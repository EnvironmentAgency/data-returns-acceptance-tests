Feature: Submit files with either Text_Value or Value data
  As a user I want to successfully submit files where value or text value are required


  Business logic
  One of Value or Txt_Value must be specified
  Only one of Value or Txt_Value can be specified at once
  If Value is used, Unit must be used
  If Txt_Value is used, Unit cannot be used

  Scenario Outline: Successfully submit a valid file where either text value or value are given
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    And I finish uploading files and continue

    Examples:
      | Filename                                                                       |
      | text_value_special_case_validation_Text_Value_No_Value_with_header_PASS.csv    |
      | text_value_special_case_validation_Text_Value_No_Value_with_no_header_PASS.csv |
      | text_value_special_case_validation_Value_No_Text_Value_with_header_PASS.csv    |
      | text_value_special_case_validation_Value_No_Text_Value_with_no_header_PASS.csv |