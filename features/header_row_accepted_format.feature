Feature: Check file acceptable header formats
 As a user I want to be able to submit files which
 comprise of different header row structures

Background:
Given I am on the Data Returns page
And I see the "Send landfill data returns" page
Then I select "Start now" button

#------------------ Valid Header formats --------------------------

@watch
Scenario Outline: Submit files with accepted header structures
And I choose header file <Filename> to upload
When I click "Check for errors"
Then I see the page "Confirm your file"

Examples:
|Filename|
|CUKE5001_Mandatory_Headers_Only.csv|
|CUKE5002_Mandatory_Headers_Order.csv|
