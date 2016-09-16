Feature: Submit files which contain all Controlled list values
  As a user I want to be informed if any of the data entered
  is not held on the Controlled list for that item

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit file comprising all Controlled Lists values
    Given I choose initial file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                               |
      | CUKE018_ALL_PARAMETERS_PASS.csv        |
      | CUKE020_ALL_RETURN_TYPES_PASS.csv      |
      | CUKE022_ALL_UNITS_PASS.csv             |
      | CUKE024_ALL_REFERENCE_PERIODS_PASS.csv |
      | CUKE026_ALL_RETURN_PERIODS_PASS.csv    |
      | CUKE028_ALL_METHOD_STANDARDS_PASS.csv  |
      | CUKE030_ALL_QUALIFIERS_PASS.csv        |
      | CUKE032_Ref_Period_ALL_PASS.csv        |

  Scenario Outline: Submit file comprising invalid Controlled List value
    Given I choose initial file <Filename> to upload
    Then I expect the file status for <Filename> to be "DATA ERROR"
    When I open the file details for <Filename>
    Then Correction table contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Correct <Header> errors"
    And I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:
      | Filename                                                 | DRref  | Header     | Error     |
      | CUKE019_ALL_PARAMETERS_plus_invalid_FAIL.csv             | DR9030 | Parameter  | Incorrect |
      | CUKE021_ALL_RETURN_TYPES_plus_invalid_FAIL.csv           | DR9010 | Rtn_Type   | Incorrect |
      | CUKE023_ALL_UNITS_plus_invalid_FAIL.csv                  | DR9050 | Unit       | Incorrect |
      | CUKE025_ALL_REFERENCE_PERIODS_plus_invalid_FAIL.csv      | DR9090 | Ref_Period | Incorrect |
      | CUKE027_ALL_RETURN_PERIODS_plus_invalid_FAIL.csv         | DR9070 | Rtn_Period | Incorrect |
      | CUKE029_ALL_METHOD_STANDARDS_plus_invalid_FAIL.csv       | DR9100 | Meth_Stand | Incorrect |
      | CUKE031_ALL_TEXT_VALUES_QUALIFIERS_plus_invalid_FAIL.csv | DR9180 | Qualifier  | Incorrect |

  Scenario Outline: Successfully submit files comprising all controlled Lists values with incorrect case (excluding units)
    Given I choose initial file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                                                |
      | CUKE018_ALL_PARAMETERS_ALL_CAPS_PASS.csv                |
      | CUKE020_ALL_RETURN_TYPES_CAPITALISE_TITLE_CASE_PASS.csv |
      | CUKE024_ALL_REFERENCE_PERIODS_UPPERCASE_PASS.csv        |
      | CUKE026_ALL_RETURN_PERIODS_UPPER_CASE_PASS.csv          |
      | CUKE028_ALL_METHOD_STANDARDS_LOWER_CASE_PASS.csv        |
      | CUKE030_ALL_QUALIFIERS_MIXED_CASE_PASS.csv              |
      | CUKE7003_Text_Value_Boolean_ALL_CAPS_PASS.csv           |


