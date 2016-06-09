Feature: Submit files for initial checking
  As a user I want to be informed if there are any
  significant problems with the format or structure
  of the file before the contents are validated
  for correctness

  Background:
    Given I am on the Data Returns page
    And I see the "Send landfill data returns" page
    Then I select "Start now" button

  @watch
  Scenario: Submit a Non-CSV file - valid error message is displayed
    And I choose initial file "CUKE001.png" to upload
    When I click "Check for errors"
    And the text "Your file isn’t saved as CSV" is displayed

  @watch
  Scenario: Submit an Empty file - valid error message is displayed
    And I choose initial file "CUKE002_Empty.csv" to upload
    When I click "Check for errors"
    Then an empty file error message is generated

  @watch
  Scenario: Submit a Security Failure file - valid error message is displayed
    And I choose initial file "CUKE004_VIRUS.csv" to upload
    When I click "Check for errors"
    Then a security fail error message is generated

  @watch
  Scenario: Submit a file exceeding maximum acceptable size - valid error message is displayed
    And I choose initial file "CUKE005_LARGE_FILE_21M_16908_records_FAIL.csv" to upload
    When I click "Check for errors"
    Then a file is too large message is generated

  @watch
  Scenario: Submit a file with incorrect structure - valid error message is displayed
    And I choose initial file "CUKE008_File_structure_data_misalignment_FAIL.csv" to upload
    When I click "Check for errors"
    Then a incorrect structure message is displayed
