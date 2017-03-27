Feature: Controlled list display
  Check that controlled lists are correctly displayed in the guidance
  As a user I want to be able to view the content of controlled lists

  Scenario: Check the controlled list pages display expected data
    Given I open the controlled list menu
    Then I open each controlled list and expect the following data
      | Title                         | Primary                      | Aliases                                                    |
      | Return type                   | Landfill leachate monitoring | []                                                         |
      | Return period                 | Jun YYYY                     | []                                                         |
# Implemented for PI and disabled for landfill release
#      | Releases and transfers        | Waste Water                  | []                                                         |
      | Monitoring standard or method | BS EN ISO 17294              | []                                                         |
      | Text value                    | See comment                  | ["See comments"]                                           |
      | Parameter (substance name)    | Tetrachloroethane            | ["1,1,1,2-Tetrachloroethane", "1,1,2,2-Tetrachloroethane"] |
      | Qualifier                     | Total volatile               | []                                                         |
      | Reference period              | Daily mean                   | ["Daily average"]                                          |
      | Unit or measure               | d                            | ["day"]                                                    |
