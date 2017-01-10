Feature: I should be able to submit files of 4Mb and the system
  should be able to report all the errors on largely incorrect files
  of this size

  Scenario: Check that the correct error messages are given in the validation pages.
    Given I have the following files and expectations
      | Filename                                                        | Status     | ErrorCode | ErrorField | ErrorCategories   |
      | failures-4Mb.csv                                                | DATA ERROR | DR9010    | Rtn_Type   | Incorrect         |
    When I upload those files
    Then I am unable to continue
    And I expect each file's status to meet expectations
    And Correction pages show the appropriate information

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    And I confirm my details are correct
    And I submit an email address
    Then I submit the confirmation code
    And I choose to send my files now
    Then My returns have been sent

    Examples:
      | Filename                                                          |
      | success-4Mb.csv                                                   |
