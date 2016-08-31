Feature: Check file invalid header formats
  As a user I want to be notified if there are issues
  with the header row structure, such as missing
  mandatory headers

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Invalid Header Formats --------------------------

  Scenario Outline: Check for missing mandatory header name
    And I choose header file <Filename> to upload
    Then I expect the file status for <Filename> to be "YOUR DATA RETURN IS INCOMPLETE (MISSING FIELDS)"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>

    Examples:
      | Filename                                        | DRref  |
      | CUKE5001_Missing_Site_Name_Header_only.csv      | DR0820 |
      | CUKE5003_Optional_headers_only.csv              | DR0820 |
      | CUKE5004_Missing_EA_ID_Header.csv               | DR0820 |
      | CUKE5006_Missing_Rtn_Type_Header.csv            | DR0820 | 
      | CUKE5008_Missing_Mon_Point_Header.csv           | DR0820 |
      | CUKE5010_Missing_Mon_Date_Header.csv            | DR0820 |
      | CUKE5012_Missing_Parameter_Header.csv           | DR0820 |
      

  Scenario Outline: Check for missing header name and associated comma
    And I choose header file <Filename> to upload
    Then I expect the file status for <Filename> to be "YOUR DATA RETURN IS INCOMPLETE (MISSING FIELDS)"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>
    Examples:
      | Filename                                        | DRref  |
      | CUKE5005_Missing_EA_ID_Header_and comma.csv     | DR0450 |
      | CUKE5007_Missing_Rtn_Type_Header_and_comma.csv  | DR0450 |
      | CUKE5009_Missing_Mon_Point_Header_and_comma.csv | DR0450 |
      | CUKE5011_Missing_Mon_Date_Header_and_comma.csv  | DR0450 |
      | CUKE5013_Missing_Parameter_Header_and_comma.csv | DR0450 |
      | CUKE5015_Missing_Value_Header_and_comma.csv     | DR0450 |
      | CUKE5017_Missing_Unit_Header_and_comma.csv      | DR0450 |
      # | CUKE5006_Missing_Site_Name_Header_and_comma.csv | DR0450 | #bug

  Scenario Outline: Check for non-specification header name
    And I choose header file <Filename> to upload
    Then I expect the file status for <Filename> to be "YOUR FILE CONTAINS UNRECOGNISABLE FIELD HEADINGS"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>

    Examples:
      | Filename                                        | DRref  |
      | CUKE5018_Unrecognised_Optional_field.csv        | DR0840 |
      | CUKE5014_Missing_Value_Header.csv               | DR0820 |
      | CUKE5016_Missing_Unit_Header.csv                | DR0820 |







      