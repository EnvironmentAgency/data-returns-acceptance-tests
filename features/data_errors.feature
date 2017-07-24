Feature: Data errors
  Check that the correct data error message is displayed
  As an user I want the correct error message to be displayed
  when a file fails data validation

  Scenario: Check that the correct error messages are given for special cases
    Given I have the following files and expectations
      | Filename                                                       | Status     | ErrorCode | ErrorField       | ErrorCategories |
      | DR9999_Text_Value_and_Value_and_unit_FAIL.csv                  | DATA ERROR | DR9999    | Value, Txt_Value | Conflicting     |
      | DR9999_Text_Value_and_Value_no_unit_no_header_FAIL.csv         | DATA ERROR | DR9999    | Value, Txt_Value | Conflicting     |
      | DR9999_Text_Value_and_Value_no_unit_header_FAIL.csv            | DATA ERROR | DR9999    | Value, Txt_Value | Conflicting     |
      | DR9999_No_Text_Value_and_No_Value_no_headers_Units_FAIL.csv    | DATA ERROR | DR9999    | Value, Txt_Value | Missing         |
      | DR9999_No_Text_Value_and_No_Value_no_headers_No_Units_FAIL.csv | DATA ERROR | DR9999    | Value, Txt_Value | Missing         |
      | DR9999_Value_and_Txt_Value_Missing.csv                         | DATA ERROR | DR9999    | Value, Txt_Value | Missing         |
      | DR9110_EA_ID_Site_name_mismatch.csv                            | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting     |
    When I upload those files
    Then I am unable to continue
    And I expect each file's status to meet expectations
    And Correction pages show the appropriate information

  #------------------ Check error DR error message displayed --------------------
  # Ignored when running on browserstack as cross-browser functionality is covered in the tests above (these tests exist to cover specific input/output testing)
  @browserstackIgnore
  Scenario: Check that the correct error messages are given in the validation pages (additional cases to cover each type of validation error)
    Given I have the following files and expectations
      | Filename                                                        | Status     | ErrorCode | ErrorField       | ErrorCategories   |
      | DR9000_EA_ID_Missing.csv                                        | DATA ERROR | DR9000    | EA_ID            | Missing           |
      | DR9000_EA_ID.csv                                                | DATA ERROR | DR9000    | EA_ID            | Incorrect         |
      | DR9000_EA_ID_M_and_I_Error.csv                                  | DATA ERROR | DR9000    | EA_ID            | Missing,Incorrect |
      | DR9010_Rtn_Type_Missing.csv                                     | DATA ERROR | DR9010    | Rtn_Type         | Missing           |
      | DR9010_Rtn_Type.csv                                             | DATA ERROR | DR9010    | Rtn_Type         | Incorrect         |
      | DR9010_Return_Type_M_and_I_Error.csv                            | DATA ERROR | DR9010    | Rtn_Type         | Missing,Incorrect |
      | DR9020_Mon_Date.csv                                             | DATA ERROR | DR9020    | Mon_Date         | Incorrect         |
      | DR9020_Mon_Date_Missing.csv                                     | DATA ERROR | DR9020    | Mon_Date         | Missing           |
      | DR9020_Mon_Date_M_and_I_Error.csv                               | DATA ERROR | DR9020    | Mon_Date         | Missing,Incorrect |
      | DR9030_Parameter_Missing.csv                                    | DATA ERROR | DR9030    | Parameter        | Missing           |
      | DR9030_Parameter.csv                                            | DATA ERROR | DR9030    | Parameter        | Incorrect         |
      | DR9030_Parameter_M_and_I_Error.csv                              | DATA ERROR | DR9030    | Parameter        | Missing,Incorrect |
      | DR9040_Value.csv                                                | DATA ERROR | DR9040    | Value            | Incorrect         |
      | DR9050_Unit.csv                                                 | DATA ERROR | DR9050    | Unit             | Incorrect         |
      | DR9050_Unit_Missing.csv                                         | DATA ERROR | DR9050    | Unit             | Missing           |
      | DR9050_Unit_M_and_I_Error.csv                                   | DATA ERROR | DR9050    | Unit             | Missing,Incorrect |
      | DR9999_Text_Value_and_Value_and_unit_FAIL.csv                   | DATA ERROR | DR9050    | Unit             | Conflicting       |
      | DR9050_Text_Value_and_Value_no_unit_no_header_FAIL.csv          | DATA ERROR | DR9050    | Unit             | Missing           |
      | DR9050_No_Text_Value_and_No_Value_headers_and_Value_FAIL.csv    | DATA ERROR | DR9050    | Unit             | Missing           |
      | DR9050_No_Text_Value_and_No_Value_no_headers_and_Value_FAIL.csv | DATA ERROR | DR9050    | Unit             | Missing           |
      | DR9060_Mon_Point_Missing.csv                                    | DATA ERROR | DR9060    | Mon_Point        | Missing           |
      | DR9060_Monitoring_Point_M_and_I_Error.csv                       | DATA ERROR | DR9060    | Mon_Point        | Missing,Length    |
      | DR9070_Rtn_Period.csv                                           | DATA ERROR | DR9070    | Rtn_Period       | Incorrect         |
      | DR9080_Txt_Value.csv                                            | DATA ERROR | DR9080    | Txt_Value        | Incorrect         |
      | DR9090_Ref_Period.csv                                           | DATA ERROR | DR9090    | Ref_Period       | Incorrect         |
      | DR9100_Meth_Stand.csv                                           | DATA ERROR | DR9100    | Meth_Stand       | Incorrect         |
      | DR9110_Site_Name.csv                                            | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting       |
      | DR9110_Site_Name_missing.csv                                    | DATA ERROR | DR9110    | Site_Name        | Missing           |
      | DR9110_Site_Name_value_M_and_I.csv                              | DATA ERROR | DR9110    | EA_ID, Site_Name | Conflicting       |
      | DR9140_Comments.csv                                             | DATA ERROR | DR9140    | Comments         | Length            |
      | DR9140_Txt_Value_has_no_comment_FAIL.csv                        | DATA ERROR | DR9140    | Comments         | Missing           |
      | DR9150_CiC.csv                                                  | DATA ERROR | DR9150    | CiC              | Length            |
    When I upload those files
    Then I am unable to continue
    And I expect each file's status to meet expectations
    And Correction pages show the appropriate information