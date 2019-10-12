Feature: Create transactions

  Scenario: Create a transaction
    Given I start the app the first time    
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press "Cash in Wallet"
    Then I press create transaction
    Then I enter "Transaction 1" into description
    Then I enter "500000" into amount       
    Then I press save

  Scenario: Create a transaction and enter an invalid ammount   
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press "Cash in Wallet"
    Then I press create transaction
    Then I enter "Transaction 2" into description 
    Then I enter "12*^123-" into "amount"       
    Then I press save
    Then I see "Invalid expression!"