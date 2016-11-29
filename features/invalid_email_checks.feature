Feature: Invalid data entry checks
  As a user I want to be informed if the information I'm providing is invalid
  So that I can correct any mistakes I've made

    Background:
    Given I've chosen my data to return
    And I confirm my details are correct

    Scenario: Invalid email address is entered
    When I submit an invalid email address
    Then I am told the email address is invalid

    Scenario: No email address is entered
    When I don't enter an email address
    Then I am told the email address is invalid