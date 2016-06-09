Feature: Check that Dates and/or Dates and Times in UK and ISO formats are accepted
  As an user I want records containing ISO and/or UK Dates
  and/or Dates and Times formats to be accepted

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Date and/or Date and Time format - Correct --------------------------
  
  Scenario Outline: Valid Date and/or Date and Time formats are accepted
    As a user I want to submit files with data containing
    dates in either UK or ISO format, and where exists containing a time
    element separated from the date by either a T or space separator
    Given I choose date file <Filename>
    And I click "Check for errors"
    Then I see the page "Confirm your file"

    Examples:
      | Filename |
      | CUKE6004_Monitoring_Date_UK_valid_FS_DDMMYYYY_PASS.csv |
      | CUKE6007_Monitoring_Date_ISO_valid_YYYY-MM-DD_PASS.csv |
      | CUKE6008_Monitoring_Date_ISO_valid_DD-MM-YYYY_PASS.csv |
      | CUKE6018_Monitoring_Date_and_Time_UK_T_separator_PASS.csv |
      | CUKE6019_Monitoring_Date_and_Time_UK_Space_separator_PASS.csv |
      | CUKE6020_Monitoring_Date_and_Time_ISO_yyyyddmmT_00_00_59_PASS.csv |
      | CUKE6021_Monitoring_Date_and_Time_ISO_yyyymmddSpace00_00_59_PASS.csv |
      | CUKE6022_Monitoring_Date_and_Time_ISO_ddmmyyyyT00_00_59_PASS.csv |
      | CUKE6023_Monitoring_Date_and_Time_ISO_ddmmyyyySpace00_00_59_PASS.csv |
