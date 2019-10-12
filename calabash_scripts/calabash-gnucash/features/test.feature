Feature: Create accounts

@reinstall
  Scenario: Create an app account without creating the default finance accounts
    Given I start the app and press next
    And I choose a random currency
    And I press "Next"
    And I wait 1 second
    And I press "Let me handle it"
    And I press "Next"
    And I wait 1 second    
    And I disable the crash report sending
    And I press "Next"
    And I press "Done"
    And I wait 1 second
    And I close the new in this version pop up    
    Then I see "No accounts to display"