Feature: Check that the service degrades gracefully if the user attempts to make unexpected navigations

  Background:
    Given I am on the landing page
    Then I start my submission

  Scenario Outline: Check that unexpected navigation displays the appropriate error message
    Then I navigate to URL "<URL>"
    Then I see the page header "Do you want to send files?"
    Then I click the link "Choose files and send"
    Then I see the page header "Check your data"

    Examples:
      | URL           |
      | /file/confirm |
      | /email        |
      | /pin          |
      | /file/send    |
      | /file/sent    |

  Scenario Outline: Submit a valid file and then go back in history
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue

    Then I am on the confirm details page
    And I confirm my details are correct
    And I submit an email address
    Then I submit the confirmation code
    Then I am on the send your files page
    And I choose to send my files now
    Then I am on the data returns sent page
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Check your data"


    Examples:
      | Filename                   |
      | multiple_file_upload_1.csv |