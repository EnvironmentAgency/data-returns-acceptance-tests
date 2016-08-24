Feature: Submit files for initial checking
  As a user I want to be informed if there are any
  significant problems with the format or structure
  of the file before the contents are validated
  for correctness

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Check for file errors (unreadable/malicious CSV content)
    And I choose initial file <Filename> to upload
    Then I expect the file status for <Filename> to be "<Error>"
    When I open the file details for <Filename>
    Then Invalid file information contains error for <DRref>

    Examples:
      | Filename                                          | DRref  | Error                                           |
      | CUKE001.png                                       | DR400 | YOUR FILE ISN’T SAVED AS CSV                    |
      | CUKE002_Empty.csv                                 | DR500 | YOUR FILE IS EMPTY                              |
      | CUKE004_VIRUS.csv                                 | DR600 | YOUR FILE IS UNSAFE                             |
      | CUKE005_LARGE_FILE_21M_16908_records_FAIL.csv     | DR550 | YOUR FILE IS TOO LARGE                          |
      | CUKE008_File_structure_data_misalignment_FAIL.csv | DR450 | THERE’S A PROBLEM WITH YOUR CSV FILE            |


    





