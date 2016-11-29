Feature: Submit files for initial checking
  As a user I want to be informed if there are any
  significant problems with the format or structure
  of the file before the contents are validated
  for correctness

  Background:
    Given I am on the landing page
    Then I start my submission

  Scenario Outline: Check for file errors (unreadable/malicious CSV content)
    And I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "<Error>"
    Given I am unable to continue
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>

    Examples:

      | Filename                                          | DRref  | Error      |
      | DR0400_not_csv.png                                | DR0400 | FILE ERROR |
      | DR0500_Empty.csv                                  | DR0500 | FILE ERROR |
      | DR0600_Unsafe.csv                                 | DR0600 | FILE ERROR |
      | DR0550_Large_file.csv                             | DR0550 | FILE ERROR |
      | DR0450_CSV_Structure.csv                          | DR0450 | FILE ERROR |
      | DR0820_Missing_Site_Name_Header_only.csv          | DR0820 | FILE ERROR |
      | DR0820_Missing_EA_ID_Header.csv                   | DR0820 | FILE ERROR |
      | DR0820_Missing_Rtn_Type_Header.csv                | DR0820 | FILE ERROR |
      | DR0820_Missing_Mon_Point_Header.csv               | DR0820 | FILE ERROR |
      | DR0820_Missing_Mon_Date_Header.csv                | DR0820 | FILE ERROR |
      | DR0820_Missing_Parameter_Header.csv               | DR0820 | FILE ERROR |
      | DR0840_Unrecognised_header.csv                    | DR0840 | FILE ERROR |
      | DR0860_Duplicate_Site_Name_Header.csv             | DR0860 | FILE ERROR |
      | DR0860_Duplicate_Sample_by_Header.csv             | DR0860 | FILE ERROR |




      

      



    





