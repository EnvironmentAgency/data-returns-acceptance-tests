Feature: Check file invalid header formats
  As a user I want to be notified if there are issues
  with the header row structure, such as missing
  mandatory headers

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Invalid Header Formats --------------------------

  Scenario Outline: Check for missing header name only
    And I choose header file <Filename> to upload
    When I click "Check for errors"
    Then your data return is incomplete error message is generated

    Examples:
      | Filename |
      | CUKE5003_Optional_headers_only.csv |
      | CUKE5004_Missing_EA_ID_Header.csv |
      | CUKE5006_Missing_Rtn_Type_Header.csv |
      | CUKE5008_Missing_Mon_Point_Header.csv |
      | CUKE5010_Missing_Mon_Date_Header.csv |
      | CUKE5012_Missing_Parameter_Header.csv |
      | CUKE5014_Missing_Value_Header.csv |
      | CUKE5016_Missing_Unit_Header.csv |

  Scenario Outline: Check for missing header name and associated comma
    And I choose header file <Filename> to upload
    When I click "Check for errors"
    Then A problem with your CSV file message is generated

    Examples:
      | Filename |
      | CUKE5005_Missing_EA_ID_Header_and comma.csv |
      | CUKE5007_Missing_Rtn_Type_Header_and_comma.csv |
      | CUKE5009_Missing_Mon_Point_Header_and_comma.csv |
      | CUKE5011_Missing_Mon_Date_Header_and_comma.csv |
      | CUKE5013_Missing_Parameter_Header_and_comma.csv |
      | CUKE5015_Missing_Value_Header_and_comma.csv |
      | CUKE5017_Missing_Unit_Header_and_comma.csv |

  Scenario Outline: Check for non-specification header name
    And I choose header file <Filename> to upload
    When I click "Check for errors"
    Then Your file contains unrecognisable field headings message is generated

    Examples:
      | Filename |
      | CUKE5018_Unrecognised_Optional_field.csv |
