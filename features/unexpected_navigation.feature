Feature: Check that the service degrades gracefully if the user attempts to make unexpected navigations

  Background:
    Given I am on the "Send landfill data returns" page
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
    Then I see the page header "Confirm details"
    And I choose to "Continue"
    And I submit an email address
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I choose to "Send code"
    Then I am on the "Send your data" page
    And I choose to "Accept and send"
    Then I see the page header "Data returns sent"
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