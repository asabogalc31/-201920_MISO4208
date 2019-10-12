Feature: Create habits

  Scenario: Create a habit of number type
    Given I start the app the first time    
    Then I see "Habits"
    Then I press "actionAdd"
    Then I press "Number"
    Then I enter "Habit of number type" into input "tvName"     
    Then I enter "Steps" into input unit   
    Then I press "Save"     
    Then I wait 2 seconds
    Then I see "Habit of number type"  