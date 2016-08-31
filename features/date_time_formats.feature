Feature: Check that Dates and/or Dates and Times in UK and ISO formats are accepted and those that aren't are rejected
  As an user I want to be notified when records containing
  incorrect Date and/or Date and Time formats and its location
  within the submitted file

    Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  
  Scenario Outline: Valid Date and/or Date and Time formats are accepted
    As a user I want to submit files with data containing
    dates in either UK or ISO format, and where exists containing a time
    element separated from the date by either a T or space separator
    Given I choose date file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                                                                |
      | CUKE6004_Monitoring_Date_UK_valid_FS_DDMMYYYY_PASS.csv                  |
      | CUKE6007_Monitoring_Date_ISO_valid_YYYY-MM-DD_PASS.csv                  |
      | CUKE6008_Monitoring_Date_ISO_valid_DD-MM-YYYY_PASS.csv                  |
      | CUKE6018_Monitoring_Date_and_Time_UK_T_separator_PASS.csv               |
      | CUKE6019_Monitoring_Date_and_Time_UK_Space_separator_PASS.csv           |
      | CUKE6020_Monitoring_Date_and_Time_ISO_yyyyddmmT_00_00_59_PASS.csv       |
      | CUKE6021_Monitoring_Date_and_Time_ISO_yyyymmddSpace00_00_59_PASS.csv    |
      | CUKE6022_Monitoring_Date_and_Time_ISO_ddmmyyyyT00_00_59_PASS.csv        |
      | CUKE6023_Monitoring_Date_and_Time_ISO_ddmmyyyySpace00_00_59_PASS.csv    |

    Scenario Outline: Date/Time - Correct error message displayed where format is incorrect
    Given I choose date file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Correction details contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename                                                                  | DRref  | Header   |
      | CUKE6001_Monitoring_Date_Future_Date_UK_FS_ddmmyyyy_FAIL.csv              | DR9020 | Mon_Date |
      | CUKE6002_Monitoring_Date_Future_Date_ISO_yyyymmdd_FAIL.csv                | DR9020 | Mon_Date |
      | CUKE6003_Monitoring_Date_Future_Date_ISO_ddmmyyyy_FAIL.csv                | DR9020 | Mon_Date |
      | CUKE6005_Monitoring_Date_UK_invalid_FS_YYYYMMDD_FAIL.csv                  | DR9020 | Mon_Date |
      | CUKE6006_Monitoring_Date_UK_invalid_FS_MMDDYYYY_FAIL.csv                  | DR9020 | Mon_Date |
      | CUKE6009_Monitoring_Date_ISO_invalid_YYYY-DD-MM_FAIL.csv                  | DR9020 | Mon_Date |
      | CUKE6010_Monitoring_Date_invalid_format_MM.DD.YYYY_FAIL.csv               | DR9020 | Mon_Date |
      | CUKE6011_Monitoring_Date_invalid_format_YYYY.MM.DD_FAIL.csv               | DR9020 | Mon_Date |
      | CUKE6012_Monitoring_Date_Time_ISO_invalid_yyyymmddT01_01_60_FAIL.csv      | DR9020 | Mon_Date |
      | CUKE6013_Monitoring_Date_Time_ISO_Invalid_yyyymmddSpace01_01_60_FAIL.csv  | DR9020 | Mon_Date |
      | CUKE6014_Monitoring_Date_Time_ISO_Invalid_ddmmyyyyT01_01_60_FAIL.csv      | DR9020 | Mon_Date |
      | CUKE6015_Monitoring_Date_Time_ISO_Invalid_ddmmyyyySpace01_01_60_FAIL.csv  | DR9020 | Mon_Date |
      | CUKE6016_Monitoring_Date_Time_UK_invalid_FS_ddmmyyyyT01_01_60_FAIL.csv    | DR9020 | Mon_Date |
      | CUKE6017_Monitoring_Date_Time_UK_invalid_FS_ddmmyyyySpace01_01_60_FAIL.csv| DR9020 | Mon_Date |
