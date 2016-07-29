Feature: Submit files where all data passes validation
  As a user I want to successfully submit files which are
  correctly structured and all data is valid

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  Scenario Outline: Submit a valid file
    And I choose successfull file <Filename> to upload
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

    Examples:
      | Filename |
      | CUKE000_SUCCESS_NO_ERRORS.csv |
      | CUKE003_Multiple_Permit_Formats_Single Rtn_Type_PASS.csv |
      | CUKE006_LARGE_FILE_MAX_21M_16907_records_PASS.csv |
      # | CUKE007_File_containing_White_Spaces.csv |
      # | CUKE009_Multi_Permits_AA_GZ_PASS.csv |
      # | CUKE010_Multi_Permits_HA_ZZ_PASS.csv |
      # | CUKE011_Multi_Permits_10_69_PASS.csv |
      # | CUKE012_Multi_Permits_70_PASS.csv |
      # | CUKE014_ALL_Fields_Multi_Return_Types_and_Permit_Formats_PASS.csv |
