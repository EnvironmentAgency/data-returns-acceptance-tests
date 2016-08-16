Feature: Check that Dates and/or Dates and Times NOT in UK and ISO formats are rejected
  As an user I want to be notified when records contain
  incorrect Date and/or Date and Time formats and its location
  within the submitted file

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Date and/or Time format Incorrect --------------------------
  
  Scenario Outline: Date/Time - Correct error message displayed where format is incorrect
    Given I choose date file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Validation information contains error for <DRref>
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename | DRref |
      | CUKE6001_Monitoring_Date_Future_Date_UK_FS_ddmmyyyy_FAIL.csv | DR9020 |
      | CUKE6002_Monitoring_Date_Future_Date_ISO_yyyymmdd_FAIL.csv | DR9020 |
      | CUKE6003_Monitoring_Date_Future_Date_ISO_ddmmyyyy_FAIL.csv | DR9020 |
      | CUKE6005_Monitoring_Date_UK_invalid_FS_YYYYMMDD_FAIL.csv | DR9020 |
      | CUKE6006_Monitoring_Date_UK_invalid_FS_MMDDYYYY_FAIL.csv | DR9020 |
      | CUKE6009_Monitoring_Date_ISO_invalid_YYYY-DD-MM_FAIL.csv | DR9020 |
      | CUKE6010_Monitoring_Date_invalid_format_MM.DD.YYYY_FAIL.csv | DR9020 |
      | CUKE6011_Monitoring_Date_invalid_format_YYYY.MM.DD_FAIL.csv | DR9020 |
      | CUKE6012_Monitoring_Date_Time_ISO_invalid_yyyymmddT01_01_60_FAIL.csv | DR9020 |
      | CUKE6013_Monitoring_Date_Time_ISO_Invalid_yyyymmddSpace01_01_60_FAIL.csv | DR9020 |
      | CUKE6014_Monitoring_Date_Time_ISO_Invalid_ddmmyyyyT01_01_60_FAIL.csv | DR9020 |
      | CUKE6015_Monitoring_Date_Time_ISO_Invalid_ddmmyyyySpace01_01_60_FAIL.csv | DR9020 |
      | CUKE6016_Monitoring_Date_Time_UK_invalid_FS_ddmmyyyyT01_01_60_FAIL.csv | DR9020 |
      | CUKE6017_Monitoring_Date_Time_UK_invalid_FS_ddmmyyyySpace01_01_60_FAIL.csv | DR9020 |
