Feature: Multiple file uploads
  As a user I want to successfully submit multiple files in one submission

  Background:
    Given I am on the landing page
    Then I start my submission

  Scenario Outline: Submit a valid file
    Given I choose file <Filename> to upload
    And I choose file <Filename2> to upload
    And I choose file <Filename3> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    And I expect the file status for <Filename2> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I am on the confirm details page
    And I confirm my details are correct
    And I submit an email address
    Then I submit the confirmation code
    Then I am on the send your files page
    And I choose to send my files now
    Then I am on the data returns sent page

    Examples:
      | Filename                     | Filename2                  | Filename3                  |
      | multiple_file_upload_1.csv   | multiple_file_upload_2.csv | multiple_file_upload_3.csv |
      
