Feature: Submit multiple files
  As a user I want to be able to submit more than one
  file (Max 10) without having to obtain further
  authorisation codes

  Scenario: Proceed to file selection page
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I start my submission
    #file 1
    And I choose file "CUKE000_SUCCESS_NO_ERRORS.csv"
    When I click "Check for errors"
    Then I see the page "Confirm your file"
    And I click on the "Confirm and check file" button
    And I input an email address
    Then I click "Send authentication email" button
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I click on the "Continue" button
    Then I am on the "Send your file" page
    And I select "Accept and send file" button
    Then I am on the last page "File sent"
    Then I click the link "send another data returns file"

  Scenario Outline: Submit a valid file
    And I choose multiple file <file>
    When I click "Check for errors"
    Then I see the page "Confirm your file"
    And I click on the "Confirm and check file" button
    Then I am on the "Send your file" page
    And I select "Accept and send file" button
    Then I am on the last page "File sent"
    Then I click the link "send another data returns file"

    Examples:
      | file |
      #file 2
      | CUKE003_Multiple_Permit_Formats_Single Rtn_Type_PASS.csv |
      #file 3
      | CUKE009_Multi_Permits_AA_GZ_PASS.csv |
      #file 4
      | CUKE010_Multi_Permits_HA_ZZ_PASS.csv |
      #file 5
      | CUKE011_Multi_Permits_10_69_PASS.csv |
      #file 6
      | CUKE012_Multi_Permits_70_PASS.csv |
      #file 7
      | CUKE013_Multi_Permit_Formats_All_PASS.csv |
      #file 8
      | CUKE014_ALL_Fields_Multi_Return_Types_and_Permit_Formats_PASS.csv |
      #file 9
      | CUKE015_Mandatory_only_Multi_Return_Types_and_Permit_Formats_PASS.csv |
      #file 10
      | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv |

  Scenario: Enter an invalid format email address
    And I choose file "CUKE000_SUCCESS_NO_ERRORS.csv"
    When I click "Check for errors"
    Then I see the page "Confirm your file"
    And I click on the "Confirm and check file" button
    Then I am on the "Confirm your email address" page
    And I enter an invalid email address
    Then I click "Send email" button
    And an invalid email error message is shown

  Scenario: Re-enter the correct email address used previously
    And I input an email address
    Then I click "Send authentication email" button
    Then I am on the "Enter your code" page
    Then I enter the confirmation code
    And I click on the "Continue" button
    Then I am on the "Send your file" page
    And I select "Accept and send file" button
    Then I am on the last page "File sent"
