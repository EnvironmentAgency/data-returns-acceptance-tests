Feature: Check that the correct data error message is displayed
  As an user I want the correct error message to be displayed
  when a file fails data validation

  #------------------ Check error DR error message displayed --------------------

  Scenario: Check that the correct error messages are given in the validation pages.
    Given I have the following files and expectations
      | Filename                                                        | Status     | ErrorCode | ErrorField | ErrorCategories   |
      | DR9110_Site_Name.csv                                            | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting |
      | DR9110_Site_Name_missing.csv                                    | DATA ERROR | DR9110    | Site_Name  | Missing           |
      | DR9110_Site_Name_value_M_and_I.csv                              | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting            |
    When I upload those files
    Then I am unable to continue
    And I expect each file's status to meet expectations
    And Correction pages show the appropriate information

  Scenario: Check that the correct error messages are given for special cases
    Given I have the following files and expectations
      | Filename                                                       | Status     | ErrorCode | ErrorField       | ErrorCategories | ErrorHeading        |
      | DR9110_EA_ID_Site_name_mismatch.csv                            | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting     | EA_ID and Site_Name |
    When I upload those files
    Then I am unable to continue
    And I expect each file's status to meet expectations
    And Correction pages show the appropriate information