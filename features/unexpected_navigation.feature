Feature: Unexpected navigation
  Check that the service degrades gracefully if the user attempts to make unexpected navigations

  Scenario Outline: Check that unexpected navigation without a session cookie displays the appropriate error message
    Given I navigate to URL "<URL>"
    Then I see the page header "Your session has timed out or cookies are turned off"

    Examples:
      | URL           |
      | /file/confirm |
      | /email        |
      | /pin          |
      | /file/send    |
      | /file/sent    |



  Scenario Outline: Check that unexpected navigation without files uploaded displays the appropriate error message
    Given I am on the landing page
    Then I navigate to URL "<URL>"
    Then I see the page header "Do you want to send files?"
    Then I click the link "Choose files and send"
    Then I see the page header "Upload and check your data"

    Examples:
      | URL           |
      | /file/confirm |
      | /email        |
      | /pin          |
      | /file/send    |
      | /file/sent    |

  Scenario: Submit a valid file and then go back in history
    Given I've chosen my data to return
    And I confirm my details are correct
    And I submit an email address
    And I submit the confirmation code
    And I choose to send my files now
    Then My returns have been sent
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Do you want to send files?"
    And I go back in browser history
    Then I see the page header "Upload and check your data"