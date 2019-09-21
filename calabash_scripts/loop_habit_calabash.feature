Feature: Starting app, night mode activation, habit creation and mark a day as done

  Scenario: As a user I want to start the app for the first time
    Given I press "next"               
    #button to start the app
    And I press "next"
    And I press "next"
    And I press "next"   
    Then I should see "Hábitos"

  Scenario: As a user I want to activate the night mode
    Given I press "options"                
    And I press "Modo nocturno"
    Then I should see "Hábitos"
