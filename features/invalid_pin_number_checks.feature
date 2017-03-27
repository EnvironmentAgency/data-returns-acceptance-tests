Feature: Invalid pin number entry checks
  As a user I want to be informed if the information I'm providing is invalid
  So that I can correct any mistakes I've made

  Background:
    Given I've chosen my data to return
    And I confirm my details are correct
    And I submit an email address

  Scenario: Invalid pin number is entered
    When I submit an invalid pin number
    Then I am shown the DR2225 error

  Scenario: No pin number is entered
    When I don't enter a pin number
    Then I am shown the DR2225 error

  Scenario: Invalid pin entered too many times
    When I keep submitting an invalid pin and get locked out
    Then I am blocked from pin entry