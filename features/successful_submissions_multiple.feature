Feature: Successful submissions: Multiple file uploads
  As a user I want to successfully submit multiple files in one submission

  Scenario: Submit multiple valid files
    Given I have the following files and expectations
      | Filename                                          | Status        |
      | multiple_file_upload_1.csv                        | READY TO SEND |
      | multiple_file_upload_2.csv                        | READY TO SEND |
      | multiple_file_upload_3.csv                        | READY TO SEND |
      | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv | READY TO SEND |
    When I upload those files
    Then I expect each file's status to meet expectations
    When I finish uploading files and continue
    Then I confirm my details are correct
    Then I submit an email address
    Then I submit the confirmation code
    Then I choose to send my files now
    Then My returns have been sent


  Scenario: Submit file comprising all Controlled Lists values
    Given I have the following files and expectations
      | Filename                                   | Status        |
      | CONTROLLED_LIST_PARAMETERS_PASS.csv        | READY TO SEND |
      | CONTROLLED_LIST_RETURN_TYPES_PASS.csv      | READY TO SEND |
      | CONTROLLED_LIST_UNITS_PASS.csv             | READY TO SEND |
      | CONTROLLED_LIST_REFERENCE_PERIODS_PASS.csv | READY TO SEND |
      | CONTROLLED_LIST_RETURN_PERIODS_PASS.csv    | READY TO SEND |
      | CONTROLLED_LIST_METHOD_STANDARDS_PASS.csv  | READY TO SEND |
      | CONTROLLED_LIST_QUALIFIERS_PASS.csv        | READY TO SEND |
      | CONTROLLED_LIST_Ref_Period_ALL_PASS.csv    | READY TO SEND |
    When I upload those files
    Then I expect each file's status to meet expectations
    When I finish uploading files and continue
    Then I confirm my details are correct
    Then I submit an email address
    Then I submit the confirmation code
    Then I choose to send my files now
    Then My returns have been sent