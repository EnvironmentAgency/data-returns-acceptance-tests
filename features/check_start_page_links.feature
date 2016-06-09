Feature: Check help links on the Start page
  Information about the service is provided through links
  on the Start page

  @watch
  Scenario: Check the Start page links
    Given I am on the Data Returns page
    And I see the "Send landfill data returns" page
    And I see "landfill emissions" link 1
    Then I click on link one "landfill emissions"
    Then I return to Data Returns
    And I see "how to format your data" link 2
    Then I click on link two "how to format your data to meet Environment Agency (EA) requirements"
    Then I return to Data Returns
    And I see "save your data as a CSV file" link 3
    Then I click on link three "save your data as a CSV file"
    Then I return to Data Returns
    And I see Scotland link
    Then I click on link four "Scotland"
    Then I return to Data Returns
    And I see Wales link
    Then I click on link five "Wales"
    Then I return to Data Returns
    And I see Northern Ireland link
    Then I click on link six "Northern Ireland"
    Then I return to Data Returns
