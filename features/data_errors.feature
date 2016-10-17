Feature: Check that the correct data error message is displayed
  As an user I want the correct error message to be displayed
  when a file fails data validation

  Background:
    Given I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Check error DR error message displayed --------------------

  Scenario Outline: Check that the correct error messages are given in the validation pages.
    Given I choose file <Filename> to upload
    Then I expect the file status for <Filename> to be "DATA ERROR"
    When I open the file details for <Filename>
    Then Correction table contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Correct <Header> errors"
    And I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:

      | Filename                                                        | DRref  | Header     | Error             |
      | DR9000_EA_ID_Missing.csv                                        | DR9000 | EA_ID      | Missing           |
      | DR9000_EA_ID.csv                                                | DR9000 | EA_ID      | Incorrect         |
      | DR9000_EA_ID_M_and_I_Error.csv                                  | DR9000 | EA_ID      | Missing,Incorrect |
      | DR9010_Rtn_Type_Missing.csv                                     | DR9010 | Rtn_Type   | Missing           |
      | DR9010_Rtn_Type.csv                                             | DR9010 | Rtn_Type   | Incorrect         |
      | DR9010_Return_Type_M_and_I_Error.csv                            | DR9010 | Rtn_Type   | Missing,Incorrect |
      | DR9020_Mon_Date.csv                                             | DR9020 | Mon_Date   | Incorrect         |
      | DR9020_Mon_Date_Missing.csv                                     | DR9020 | Mon_Date   | Missing           |
      | DR9020_Mon_Date_M_and_I_Error.csv                               | DR9020 | Mon_Date   | Missing,Incorrect |
      | DR9030_Parameter_Missing.csv                                    | DR9030 | Parameter  | Missing           |
      | DR9030_Parameter.csv                                            | DR9030 | Parameter  | Incorrect         |
      | DR9030_Parameter_M_and_I_Error.csv                              | DR9030 | Parameter  | Missing,Incorrect |
      | DR9040_Value.csv                                                | DR9040 | Value      | Incorrect         |
      | DR9050_Unit.csv                                                 | DR9050 | Unit       | Incorrect         |
      | DR9050_Unit_Missing.csv                                         | DR9050 | Unit       | Missing           |
      | DR9050_Unit_M_and_I_Error.csv                                   | DR9050 | Unit       | Missing,Incorrect |
      | DR9999_Text_Value_and_Value_and_unit_FAIL.csv                   | DR9050 | Unit       | Conflicting       |
      | DR9050_Text_Value_and_Value_no_unit_no_header_FAIL.csv          | DR9050 | Unit       | Missing           |
      | DR9050_No_Text_Value_and_No_Value_headers_and_Value_FAIL.csv    | DR9050 | Unit       | Missing           |
      | DR9050_No_Text_Value_and_No_Value_no_headers_and_Value_FAIL.csv | DR9050 | Unit       | Missing           |
      | DR9060_Mon_Point_Missing.csv                                    | DR9060 | Mon_Point  | Missing           |
      | DR9060_Monitoring_Point_M_and_I_Error.csv                       | DR9060 | Mon_Point  | Missing,Incorrect |
      | DR9060_Mon_Point.csv                                            | DR9060 | Mon_Point  | Incorrect         |
      | DR9070_Rtn_Period.csv                                           | DR9070 | Rtn_Period | Incorrect         |
      | DR9080_Txt_Value.csv                                            | DR9080 | Txt_Value  | Incorrect         |
      | DR9090_Ref_Period.csv                                           | DR9090 | Ref_Period | Incorrect         |
      | DR9100_Meth_Stand.csv                                           | DR9100 | Meth_Stand | Incorrect         |
      | DR9110_Site_Name.csv                                            | DR9110 | Site_Name  | Incorrect         |
      | DR9110_Site_Name_missing.csv                                    | DR9110 | Site_Name  | Missing           |
      | DR9110_Site_Name_256_Length.csv                                 | DR9110 | Site_Name  | Length            |
      | DR9110_Site_Name_value_M_and_I.csv                              | DR9110 | Site_Name  | Missing,Incorrect |


# Tests for Smpl_Ref and Smpl_By currently disabled as these are to be removed from the service
#      | DR9120_Smpl_Ref_Incorrect.csv                                     | DR9120 | Smpl_Ref   | Incorrect         |
#      | DR9120_Smpl_Ref.csv                                               | DR9120 | Smpl_Ref   | Length            |
#      | DR9130_Smpl_By_Length.csv                                         | DR9130 | Smpl_By    | Length            |
      | DR9140_Comments.csv                                             | DR9140 | Comments   | Length            |
      | DR9140_Txt_Value_has_no_comment_FAIL.csv                        | DR9140 | Comments   | Missing           |
      | DR9150_CiC.csv                                                  | DR9150 | CiC        | Length            |

# Tests for CAS/RD_Code removed for now as these MAY be deprecated when we receive the dep for pi/lcp/rems
#      | DR9160_CAS.csv                                                    | DR9160 | CAS        | Length            |
#      | DR9170_RD_Code.csv                                                | DR9170 | RD_Code    | Length            |
      | DR9999_Text_Value_and_Value_and_unit_FAIL.csv                   | DR9999 | Multiple   | Conflicting       |
      | DR9999_Text_Value_and_Value_no_unit_no_header_FAIL.csv          | DR9999 | Multiple   | Conflicting       |
      | DR9999_Text_Value_and_Value_no_unit_header_FAIL.csv             | DR9999 | Multiple   | Conflicting       |
      | DR9999_No_Text_Value_and_No_Value_no_headers_Units_FAIL.csv     | DR9999 | Multiple   | Missing           |
      | DR9999_No_Text_Value_and_No_Value_no_headers_No_Units_FAIL.csv  | DR9999 | Multiple   | Missing           |
      | DR9999_Value_and_Txt_Value_Missing.csv                          | DR9999 | Multiple   | Missing           |


    
      



      
      
      
      
      
      
      

            
      
      
      
      
      
      
      
