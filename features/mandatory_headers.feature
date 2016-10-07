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
    Then I expect the file status for <Filename> to be "FILE ERROR"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>

    Examples:
      | Filename                                   | DRref  |
      | CUKE5001_Missing_Site_Name_Header_only.csv | DR0820 |
      | CUKE5003_Optional_headers_only.csv         | DR0820 |
      | CUKE5004_Missing_EA_ID_Header.csv          | DR0820 |
      | CUKE5006_Missing_Rtn_Type_Header.csv       | DR0820 |
      | CUKE5008_Missing_Mon_Point_Header.csv      | DR0820 |
      | CUKE5010_Missing_Mon_Date_Header.csv       | DR0820 |
      | CUKE5012_Missing_Parameter_Header.csv      | DR0820 |


  Scenario Outline: Check for missing header name and with additional column (comma)
    And I choose header file <Filename> to upload
    Then I expect the file status for <Filename> to be "FILE ERROR"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>
    Examples:
      | Filename                                        | DRref  |
      | CUKE5005_Missing_EA_ID_Header_and_comma.csv     | DR0820 |
      | CUKE5007_Missing_Rtn_Type_Header_and_comma.csv  | DR0820 |
      | CUKE5009_Missing_Mon_Point_Header_and_comma.csv | DR0820 |
      | CUKE5011_Missing_Mon_Date_Header_and_comma.csv  | DR0820 |
      | CUKE5013_Missing_Parameter_Header_and_comma.csv | DR0820 |
      | CUKE5019_Missing_Site_Name_Header_and_comma.csv | DR0820 |




      







      