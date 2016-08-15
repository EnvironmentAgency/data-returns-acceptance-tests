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
    Then I see the page header "Confirm your files"

    Examples:
      | Filename |
      | CUKE018_ALL_PARAMETERS_ex_866_596_597_PASS.csv |
      | CUKE020_ALL_RETURN_TYPES_PASS.csv |
      | CUKE022_ALL_UNITS_ex_51_Celsius_PASS.csv |
      | CUKE024_ALL_REFERENCE_PERIODS_PASS.csv |
      | CUKE026_ALL_RETURN_PERIODS_PASS.csv |
      | CUKE028_ALL_METHOD_STANDARDS_PASS.csv |
      | CUKE030_ALL_QUALIFIERS_PASS.csv |

  Scenario Outline: Submit file comprising invalid Controlled List value
    Given I choose initial file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    Then I finish uploading files and continue
    Then I am unable to continue

    Examples:
      | Filename | Error |
      | CUKE019_ALL_PARAMETERS_plus_invalid_FAIL.csv | Incorrect |
      | CUKE021_ALL_RETURN_TYPES_plus_invalid_FAIL.csv | Incorrect |
      | CUKE023_ALL_UNITS_plus_invalid_FAIL.csv | Incorrect |
      | CUKE025_ALL_REFERENCE_PERIODS_plus_invalid_FAIL.csv | Incorrect |
      | CUKE027_ALL_MONITORING_PERIODS_plus_invalid_FAIL.csv | Incorrect |
      | CUKE029_ALL_METHOD_STANDARDS_plus_invalid_FAIL.csv | Incorrect |
      | CUKE031_ALL_TEXT_VALUES_QUALIFIERS_plus_invalid_FAIL.csv | Incorrect |
