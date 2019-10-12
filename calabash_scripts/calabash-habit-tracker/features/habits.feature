Feature: Create habits

  Scenario: Create a habit
    Given I start the app the first time
    Then I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit test" into input "tvName"
    Then I press "Save"
    Then I see "Habit test"

  Scenario Outline: Create a habit with several names 
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter <habit_name> into input "tvName"
    Then I press "Save"
    Then I see <habit_name>

  Examples:
    |     habit_name            |    
    |    "Trotar"               |                       
    |    "%/&&&//??/1231%/&%()" |  

  Scenario: Create a habit and leave the name field empty    
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I press "Save"     
    Then I see "Name cannot be blank"      

  Scenario: Create a habit that repeats every day    
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit every day" into input "tvName"    
    Then I wait 2 seconds
    Then I press "Save"     
    Then I wait 2 seconds
    Then I see "Habit every day"   
  
  Scenario: Create a habit that repeats every week    
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit every week" into input "tvName"
    Then I press "Every day"
    Then I wait 2 seconds
    Then I press "Every week"
    Then I wait 2 seconds
    Then I press "Save"     
    Then I wait 2 seconds
    Then I see "Habit every week"

  Scenario: Create a habit that repeats two times per week    
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit two times per week" into input "tvName"
    Then I press "Every day"
    Then I wait 2 seconds
    Then I press "2 times per week"
    Then I wait 2 seconds
    Then I press "Save" 
    Then I wait 2 seconds    
    Then I see "Habit two times per week"

  Scenario: Create a habit that repeats five times per week    
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Yes or No"
    Then I enter "Habit five times per week" into input "tvName"
    Then I press "Every day"
    Then I wait 2 seconds
    Then I press "5 times per week"
    Then I wait 2 seconds
    Then I press "Save" 
    Then I wait 2 seconds    
    Then I see "Habit five times per week"

  Scenario: Create a habit of number type    
    Given I see "Habits"    
    Then I press "actionAdd"
    Then I press "Number"
    Then I enter "Habit of number type" into input "tvName"     
    Then I enter "Steps" into input unit   
    Then I press "Save"     
    Then I wait 2 seconds
    Then I see "Habit of number type"  

  Scenario Outline: Create a habit with several names 
    Given I see "Habits"
    Then I press "actionAdd"
    Then I press "Number"
    Then I enter <habit_name> into input "tvName"   
    Then I press "Save"
    Then I see <habit_name>

  Examples:
    |     habit_name            |    
    |    "Trotar"               |                       
    |    "Beber agua"           |

  Scenario: Create a habit of number type and leave the name field empty  
    Given I see "Habits"    
    Then I press "actionAdd"
    Then I press "Number"
    Then I press "Save"     
    Then I see "Name cannot be blank" 
 