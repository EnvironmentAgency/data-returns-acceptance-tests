Feature: Check file contents for incorrect Optional data
  As an user I want to be notified when optional data
  is Incorrect and its location within the submitted file

  Background:
    Given I am on the start page
    And I am on the "Send landfill data returns" page
    Then I start my submission

  #------------------ Optional Fields ----------------------------------
  
  Scenario Outline: For OPTIONAL fields check that the correct error message is displayed
    where data for submitted records is Incorrect
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "MULTIPLE VALIDATION ERRORS"
    When I open the file details for <Filename>
    Then Correction details contains error for <DRref> for the header "<Header>"
    And I expect the column heading for error <DRref> to be "<Header>"
    And I expect the error type for error <DRref> to be "<Error>"
    Then I open row correction details for error <DRref>
    And I see the page header "Details of errors"
    And I expect the row correction details for error <DRref> to be shown

    Examples:
      | Filename                                              | DRref  | Header     | Error     |
      | CUKE4002_OPT_Ref_Period_Non_Controlled_List_FAIL.csv  | DR9090 | Ref_Period | Incorrect |
      | CUKE4003_OPT_Ref_Period_256_Char_FAIL.csv             | DR9090 | Ref_Period | Incorrect |
      | CUKE4004_OPT_Mon_Period_Non_Controlled_List_FAIL.csv  | DR9070 | Rtn_Period | Incorrect |
      | CUKE4005_OPT_Mon_Period_31_characters_FAIL.csv        | DR9070 | Rtn_Period | Incorrect |
      | CUKE4007_OPT_Smpl_Ref_Special_Characters_FAIL.csv     | DR9120 | Smpl_Ref   | Incorrect |
      | CUKE4008_OPT__Smpl_Ref_256_Characters_FAIL.csv        | DR9120 | Smpl_Ref   | Incorrect |
      | CUKE4011_OPT_Smpl_By_256_Characters_FAIL.csv          | DR9130 | Smpl_By    | Incorrect |
      | CUKE4013_OPT_Text_Value_Non_Controlled_List_FAIL.csv  | DR9080 | Txt_Value  | Incorrect |
      | CUKE4014_OPT_Text_Value_256_Characters_FAIL.csv       | DR9080 | Txt_Value  | Incorrect |

      #-----------------
      | CUKE4024_OPT_Site_Name_Special_Characters_FAIL.csv    | DR9110 | Site_Name  | Incorrect |
      | CUKE4025_OPT_Site_Name_256_Characters_FAIL.csv        | DR9110 | Site_Name  | Incorrect |
      | CUKE4027_OPT_Comments_256_Characters_FAIL.csv         | DR9140 | Comments   | Incorrect |
      | CUKE4029_OPT_Meth_Stand_Non_Controlled_List_FAIL.csv  | DR9100 | Meth_Stand | Incorrect |
      | CUKE4030_OPT_Meth_Stand_Special_Characters_FAIL.csv   | DR9100 | Meth_Stand | Incorrect |
      | CUKE4031_OPT_Meth_Stand_31_characters_FAIL.csv        | DR9100 | Meth_Stand | Incorrect |
      #-----------------
      | CUKE4034_OPT_CiC_256_Characters_FAIL.csv              | DR9150 | CiC        | Incorrect |
      | CUKE4038_OPT_CAS_256_Characters_FAIL.csv              | DR9160 | CAS        | Incorrect |
      | CUKE4041_OPT_RD_Code_256_Characters_FAIL.csv          | DR9170 | RD_Code    | Incorrect |
