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
    Then I expect the file status for <Filename> to be "DATA ERROR"
    When I open the file details for <Filename>
    Then Correction table contains error for <DRref> for the header "<Header>"
    Then I open row correction details for error <DRref>
    And I see the page header "Correct <Header> errors"
    And I expect the row correction details for error <DRref> to show errors for <Error>

    Examples:
      | Filename                                             | DRref  | Header     | Error     |
      | CUKE4002_OPT_Ref_Period_Non_Controlled_List_FAIL.csv | DR9090 | Ref_Period | Incorrect |
      | CUKE4004_OPT_Mon_Period_Non_Controlled_List_FAIL.csv | DR9070 | Rtn_Period | Incorrect |
      | CUKE4007_OPT_Smpl_Ref_Special_Characters_FAIL.csv    | DR9120 | Smpl_Ref   | Incorrect |
      | CUKE4008_OPT__Smpl_Ref_256_Characters_FAIL.csv       | DR9120 | Smpl_Ref   | Length    |
      | CUKE4011_OPT_Smpl_By_256_Characters_FAIL.csv         | DR9130 | Smpl_By    | Length    |
      | CUKE4013_OPT_Text_Value_Non_Controlled_List_FAIL.csv | DR9080 | Txt_Value  | Incorrect |

      #-----------------
      | CUKE4024_OPT_Site_Name_Special_Characters_FAIL.csv   | DR9110 | Site_Name  | Incorrect |
      | CUKE4025_OPT_Site_Name_256_Characters_FAIL.csv       | DR9110 | Site_Name  | Length    |
      | CUKE4027_OPT_Comments_256_Characters_FAIL.csv        | DR9140 | Comments   | Length    |
      | CUKE4029_OPT_Meth_Stand_Non_Controlled_List_FAIL.csv | DR9100 | Meth_Stand | Incorrect |
      #-----------------
      | CUKE4034_OPT_CiC_256_Characters_FAIL.csv             | DR9150 | CiC        | Length    |
      | CUKE4038_OPT_CAS_256_Characters_FAIL.csv             | DR9160 | CAS        | Length    |
      | CUKE4041_OPT_RD_Code_256_Characters_FAIL.csv         | DR9170 | RD_Code    | Length    |

  Scenario Outline: For OPTIONAL fields check that null values are accepted
    Given I choose validation test file <Filename> to upload
    Then I expect the file status for <Filename> to be "READY TO SEND"
    When I finish uploading files and continue
    Then I see the page header "Confirm details"

    Examples:
      | Filename                              |
      | CUKE4001_OPT_Ref_Period_Null_PASS.csv |
      | CUKE4006_OPT_Mon_Period_NULL_PASS.csv |
      | CUKE4009_OPT__Smpl_Ref_NULL_PASS.csv  |
      | CUKE4012_OPT_Smpl_By_NULL_PASS.csv    |
      | CUKE4028_OPT_Comments_NULL_PASS.csv   |
      | CUKE4032_OPT_Meth_Stand_NULL_PASS.csv |
      | CUKE4035_OPT_CiC_NULL_PASS.csv        |
      | CUKE4039_OPT_CAS_NULL_PASS.csv        |
      | CUKE4042_OPT_RD_Code_NULL_PASS.csv    |
