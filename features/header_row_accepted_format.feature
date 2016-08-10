Feature: Check file acceptable header formats
  As a user I want to be able to submit files which
  comprise of different header row structures

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Valid Header formats --------------------------
  
  Scenario Outline: Submit files with accepted header structures
    And I choose header file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm your files"

    Examples:
      | Filename |
      | CUKE5001_Mandatory_Headers_Only.csv |
      | CUKE5002_Mandatory_Headers_Order.csv |
