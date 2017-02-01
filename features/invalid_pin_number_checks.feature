Feature: Invalid data entry checks
  As a user I want to be informed if the information I'm providing is invalid
  So that I can correct any mistakes I've made

  Background:
    Given I've chosen my data to return
    And I confirm my details are correct
    And I submit an email address

  Scenario: Invalid pin number is entered
    When I submit an invalid pin number
    Then an error message is shown

  Scenario: No pin number is entered
    When I don't enter a pin number
    Then an error message is shown

  Scenario: Invalid pin entered too many times
    When I keep submitting an invalid pin and get locked out
    Then I am blocked from pin entry