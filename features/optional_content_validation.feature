Feature: Check file contents for incorrect Optional data
  As an user I want to be notified when optional data
  is Incorrect and its location within the submitted file

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I select "Start now" button

  #------------------ Optional Fields ----------------------------------
  @watch
  Scenario Outline: For OPTIONAL fields check that the correct error message is displayed
    where data for submitted records is Incorrect
    Given I choose file <Filename>
    And I click "Check for errors"
    And Column field shows <Header>
    And Error column shows as <Error>
    Then I click "See details of which rows to correct" link

    Examples:
      | Filename | DRref | Header | Error |
      | CUKE4002_OPT_Ref_Period_Non_Controlled_List_FAIL.csv | DR9090 | Ref_Period | Incorrect |
      | CUKE4003_OPT_Ref_Period_256_Char_FAIL.csv | DR9090 | Ref_Period | Incorrect |
      | CUKE4004_OPT_Mon_Period_Non_Controlled_List_FAIL.csv | DR9070 | Mon_Period | Incorrect |
      | CUKE4005_OPT_Mon_Period_31_characters_FAIL.csv | DR9070 | Mon_Period | Incorrect |
      | CUKE4007_OPT_Smpl_Ref_Special_Characters_FAIL.csv | DR9120 | Smpl_Ref | Incorrect |
      | CUKE4008_OPT__Smpl_Ref_256_Characters_FAIL.csv | DR9120 | Smpl_Ref | Incorrect |
      | CUKE4011_OPT_Smpl_By_256_Characters_FAIL.csv | DR9130 | Smpl_By | Incorrect |
      | CUKE4013_OPT_Text_Value_Non_Controlled_List_FAIL.csv | DR9080 | Txt_Value | Incorrect |
      | CUKE4014_OPT_Text_Value_256_Characters_FAIL.csv | DR9080 | Txt_Value | Incorrect |
      #-------------
      | CUKE4016_OPT_Text_Value_Boolean_y_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4017_OPT_Text_Value_Boolean_Y_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4018_OPT_Text_Value_Boolean_n_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4019_OPT_Text_Value_Boolean_N_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4020_OPT_Text_Value_Boolean_t_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4021_OPT_Text_Value_Boolean_T_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4022_OPT_Text_Value_Boolean_f_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      | CUKE4023_OPT_Text_Value_Boolean_F_FAIL.csv | DR0980 | Txt_Value | Incorrect |
      #-----------------
      | CUKE4024_OPT_Site_Name_Special_Characters_FAIL.csv | DR9110 | Site_Name | Incorrect |
      | CUKE4025_OPT_Site_Name_256_Characters_FAIL.csv | DR9110 | Site_Name | Incorrect |
      | CUKE4027_OPT_Comments_256_Characters_FAIL.csv | DR9140 | Comments | Incorrect |
      | CUKE4029_OPT_Meth_Stand_Non_Controlled_List_FAIL.csv | DR9100 | Meth_Stand | Incorrect |
      | CUKE4030_OPT_Meth_Stand_Special_Characters_FAIL.csv | DR9100 | Meth_Stand | Incorrect |
      | CUKE4031_OPT_Meth_Stand_31_characters_FAIL.csv | DR9100 | Meth_Stand | Incorrect |
      #-----------------
      | CUKE4034_OPT_CiC_256_Characters_FAIL.csv | DR9150 | CiC | Incorrect |
      | CUKE4038_OPT_CAS_256_Characters_FAIL.csv | Dr9160 | CAS | Incorrect |
      | CUKE4041_OPT_RD_Code_256_Characters_FAIL.csv | DR9170 | RD_Code | Incorrect |
