Feature: Submit files where data comprises of Boolean values
 As a user I want to successfully submit files where specific
 fields contain Boolean (Yes/No/True/False) values

Background:
Given I am on the Data Returns page
And I see the "Send landfill data returns" page
Then I select "Start now" button

@watch
Scenario Outline: Submit a valid file where the Text Value field holds a Boolean value
And I choose boolean file <Filename> to upload
When I click "Check for errors"
Then I see the page "Confirm your file"

Examples:
|Filename|
|CUKE7001_OPT_Text_Value_Boolean_YES_PASS.csv|
|CUKE7002_OPT_Text_Value_Boolean_Yes_PASS.csv|
|CUKE7003_OPT_Text_Value_Boolean_yes_PASS.csv|
|CUKE7004_OPT_Text_Value_Boolean_NO_PASS.csv|
|CUKE7005_OPT_Text_Value_Boolean_No_PASS.csv|
|CUKE7006_OPT_Text_Value_Boolean_no_PASS.csv|
|CUKE7007_OPT_Text_Value_Boolean_TRUE_PASS.csv|
|CUKE7008_OPT_Text_Value_Boolean_True_PASS.csv|
|CUKE7009_OPT_Text_Value_Boolean_true_PASS.csv|
|CUKE7010_OPT_Text_Value_Boolean_FALSE_PASS.csv|
|CUKE7011_OPT_Text_Value_Boolean_False_PASS.csv|
|CUKE7012_OPT_Text_Value_Boolean_false_PASS.csv|
|CUKE7013_OPT_Text_Value_Boolean_1_PASS.csv|
|CUKE7014_OPT_Text_Value_Boolean_0_PASS.csv|

@watch
Scenario Outline: Check that the correct error message is displayed for non Boolean data
And I choose boolean file <Filename> to upload
When I click "Check for errors"
Then Text value data correction message <DRref> is displayed
Then I click "See details of which rows to correct" link
Then Text value additional details message <DRref> is displayed

Examples:
|Filename|DRref|
|CUKE7015_OPT_Text_Value_Boolean_y_FAIL.csv|DR9080|
|CUKE7016_OPT_Text_Value_Boolean_Y_FAIL.csv|DR9080|
|CUKE7017_OPT_Text_Value_Boolean_n_FAIL.csv|DR9080|
|CUKE7018_OPT_Text_Value_Boolean_N_FAIL.csv|DR9080|
|CUKE7019_OPT_Text_Value_Boolean_t_FAIL.csv|DR9080|
|CUKE7020_OPT_Text_Value_Boolean_T_FAIL.csv|DR9080|
|CUKE7021_OPT_Text_Value_Boolean_f_FAIL.csv|DR9080|
|CUKE7022_OPT_Text_Value_Boolean_F_FAIL.csv|DR9080|
