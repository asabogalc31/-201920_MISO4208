Feature: Filter habits

  Scenario: Create a habit
    Given I start the app the first time
    Then I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit test" into input "tvName"
    Then I press "Save"
    Then I see "Habit test"
