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
    And I choose boolean file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"

    Examples:
      | Filename                                              |
      | CUKE7025_Text_Value_No_Value_with_header_PASS.csv     |
      | CUKE7026_Text_Value_No_Value_with_no_header_PASS.csv  |
      | CUKE7027_Value_No_Text_Value_with_header_PASS.csv     |
      | CUKE7028_Value_No_Text_Value_with_no_header_PASS.csv  |


    Scenario Outline: Check that the correct error message is for invalid value, text value logic
    * I choose boolean file <Filename> to upload
    * I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    * I open the file details for <Filename>
    * Correction details contains error for <DRref> for the header "<Header>"
    * I expect the column heading for error <DRref> to be "<Header>"
    * I expect the error type for error <DRref> to be "<Error>"
    * I open row correction details for error <DRref>
    * I see the page header "Details of errors"
    * I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename                                                          | DRref    | Header      | Error        |
      | CUKE7029_Text_Value_and_Value_and_unit_FAIL.csv                   | DR9999   | (Multiple)  | Conflicting  |
      | CUKE7029_Text_Value_and_Value_and_unit_FAIL.csv                   | DR9050   | Unit        | Conflicting  |
      | CUKE7030_Text_Value_and_Value_no_unit_no_header_FAIL.csv          | DR9999   | (Multiple)  | Conflicting  |
      | CUKE7030_Text_Value_and_Value_no_unit_no_header_FAIL.csv          | DR9050   | Unit        | Missing      |
      | CUKE7031_Text_Value_and_Value_no_unit_header_FAIL.csv             | DR9999   | (Multiple)  | Conflicting  | 
      | CUKE7032_No_Text_Value_and_No_Value_no_headers_Units_FAIL.csv     | DR9999   | Value       | Missing      |
      | CUKE7033_No_Text_Value_and_No_Value_no_headers_No_Units_FAIL.csv  | DR9999   | (Multiple)  | Missing      | 
      | CUKE7034_No_Text_Value_and_No_Value_headers_and_Value_FAIL.csv    | DR9050   | Unit        | Missing      |
      | CUKE7035_No_Text_Value_and_No_Value_no_headers_and_Value_FAIL.csv | DR9050   | Unit        | Missing      |

