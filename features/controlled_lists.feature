Feature: Submit files which contain all Controlled list values
  As a user I want to be informed if any of the data entered
  is not held on the Controlled list for that item

  Background:
    Given I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit file comprising all Controlled Lists values
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                                   |
      | CONTROLLED_LIST_PARAMETERS_PASS.csv        |
      | CONTROLLED_LIST_RETURN_TYPES_PASS.csv      |
      | CONTROLLED_LIST_UNITS_PASS.csv             |
      | CONTROLLED_LIST_REFERENCE_PERIODS_PASS.csv |
      | CONTROLLED_LIST_RETURN_PERIODS_PASS.csv    |
      | CONTROLLED_LIST_METHOD_STANDARDS_PASS.csv  |
      | CONTROLLED_LIST_QUALIFIERS_PASS.csv        |
      | CONTROLLED_LIST_Ref_Period_ALL_PASS.csv    |





