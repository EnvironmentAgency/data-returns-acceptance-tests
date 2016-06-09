Feature: Check that the correct error message is displayed
  As an user I want the correct error message to be displayed
  when a file fails data validation

  Background:
    Given I am on the Data Returns page
    And I am on the "Send landfill data returns" page
    Then I select "Start now" button

  #------------------ Check error DR error message displayed --------------------
  @watch
  Scenario: Check that the correct Permit number error message is displayed
    Given I choose failed file "CUKE1001_EA_ID_Incorrect_error.csv" to upload
    When I click "Check for errors"
    Then Permit number correction message "DR9000" is displayed
    Then I click "See details of which rows to correct" link
    Then Permit number additional details message "DR9000" is displayed

  @watch
  Scenario: Check that the correct Return Type error message is displayed
    Given I choose failed file "CUKE1002_Return_Type_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Return Type correction message "DR9010" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9010" is displayed

  @watch
  Scenario: Check that the correct Monitoring Date error message is displayed
    Given I choose failed file "CUKE1004_Monitoring_Date_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Monitoring Date correction message "DR9020" is displayed
    Then I click "See details of which rows to correct" link
    Then Monitoring Date additional details message "DR9020" is displayed

  @watch
  Scenario: Check that the correct Parameter error message is displayed
    Given I choose failed file "CUKE1005_Parameter_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Parameter correction message "DR9030" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9030" is displayed

  @watch
  Scenario: Check that the correct Value error message is displayed
    Given I choose failed file "CUKE1006_Value_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Value correction message "DR9040" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9040" is displayed

  @watch
  Scenario: Check that the correct Units error message is displayed
    Given I choose failed file "CUKE1007_Unit_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Units correction message "DR9050" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9050" is displayed

  @watch
  Scenario: Check that the correct Monitoring Point error message is displayed
    Given I choose failed file "CUKE1003_Monitoring_Point_Incorrect_Error.csv" to upload
    When I click "Check for errors"
    Then Monitoring Point correction message "DR9060" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9060" is displayed

  @watch
  Scenario: Check that the correct Monitoring Period error message is displayed
    Given I choose failed file "CUKE4004_OPT_Mon_Period_Non_Controlled_List_FAIL.csv" to upload
    When I click "Check for errors"
    Then Monitoring Period correction message "DR9070" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9070" is displayed

  @watch
  Scenario: Check that the correct Text Value error message is displayed
    Given I choose failed file "CUKE4013_OPT_Text_Value_Non_Controlled_List_FAIL.csv" to upload
    When I click "Check for errors"
    Then Text Value correction message "DR9080" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9080" is displayed

  @watch
  Scenario: Check that the correct Reference Period error message is displayed
    Given I choose failed file "CUKE4002_OPT_Ref_Period_Non_Controlled_List_FAIL.csv" to upload
    When I click "Check for errors"
    Then Reference Period correction message "DR9090" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9090" is displayed

  @watch
  Scenario: Check that the correct Method Standard error message is displayed
    Given I choose failed file "CUKE4029_OPT_Meth_Stand_Non_Controlled_List_FAIL.csv" to upload
    When I click "Check for errors"
    Then Method Standard correction message "DR9100" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9100" is displayed

  @watch
  Scenario: Check that the correct Site Name error message is displayed
    Given I choose failed file "CUKE4024_OPT_Site_Name_Special_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then Site Name correction message "DR9110" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9110" is displayed

  @watch
  Scenario: Check that the correct Sample Reference error message is displayed
    Given I choose failed file "CUKE4008_OPT__Smpl_Ref_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then Sample Reference correction message "DR9120" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9120" is displayed

  @watch
  Scenario: Check that the correct Sampled By error message is displayed
    Given I choose failed file "CUKE4011_OPT_Smpl_By_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then Sampled By correction message "DR9130" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9130" is displayed

  @watch
  Scenario: Check that the correct Comments error message is displayed
    Given I choose failed file "CUKE4027_OPT_Comments_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then Comments correction message "DR9140" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9140" is displayed

  @watch
  Scenario: Check that the correct CiC error message is displayed
    Given I choose failed file "CUKE4034_OPT_CiC_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then CiC correction message "DR9150" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9150" is displayed

  @watch
  Scenario: Check that the correct CAS error message is displayed
    Given I choose failed file "CUKE4038_OPT_CAS_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then CAS correction message "DR9160" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9160" is displayed

  @watch
  Scenario: Check that the correct RD Code error message is displayed
    Given I choose failed file "CUKE4041_OPT_RD_Code_256_Characters_FAIL.csv" to upload
    When I click "Check for errors"
    Then RD Code correction message "DR9170" is displayed
    Then I click "See details of which rows to correct" link
    Then additional details correction message "DR9170" is displayed
