Feature: Create accounts

  Scenario: Create an account 
    Given I start the app the first time    
    Then I press create account
    Then I enter "Account name" into input "name_text_input_layout"    
    Then I enter "Account description" into input "description_input_layout"
    And I hide the keyboard    
    Then I press save    
    Then I see "Account name"

Scenario Outline: Create an account with several names and descriptions     
    Then I press create account
    Then I enter <account_name> into input "name_text_input_layout"    
    Then I enter <account_description> into input "description_input_layout"
    And I hide the keyboard        
    Then I press save
    Then I see <account_name>

  Examples:
    |     account_name          |    account_description    |
    |    "Cuenta de ahorros"    |   "Cuenta de colpatria"   |        
    |    "%/%/%%/1231%/&%()"    |  "&&%ññ23%/$&/&)()??)=)=?"|     

Scenario: Create an account with an empty name     
    Then I press create account    
    And I hide the keyboard        
    Then I press save
    Then I see "Enter an account name to create an account" 

Scenario: Create an account with an empty description     
    Then I press create account
    Then I enter "Account name" into input "name_text_input_layout"        
    And I hide the keyboard
    Then I press save
    Then I see "Account name" 

Scenario: Create an account without select the placeholder account checkbox     
    Then I press create account
    Then I enter "No placeholder account" into input "name_text_input_layout"
    Then I enter the account description
    And I hide the keyboard    
    Then I press save
    Then I wait 2 seconds
    Then I see "Accounts" 
    Then I press "No placeholder account"  
    Then I see "Transactions"   

Scenario: Create an account and select the placeholder account checkbox     
    Then I press create account
    Then I enter "Placeholder account" into input "name_text_input_layout"
    Then I enter the account description
    And I hide the keyboard
    Then I press "Placeholder account"
    Then I press save
    Then I wait 2 seconds
    Then I see "Accounts" 
    Then I press "Placeholder account"  
    Then I don't see "Transactions"    

Scenario: Create an account and add it to favorites     
    Then I press create account
    Then I enter "Account name" into input "name_text_input_layout"        
    And I hide the keyboard
    Then I press save
    Then I see "Account name" 
    Then I press "Account name"
    Then I press "Navigation drawer opened"
    Then I wait 2 seconds
    Then I press "Favorites"
    Then I see "Account name"

  Scenario: Create a subaccount     
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter "Account name" into input "name_text_input_layout"    
    Then I enter "Account description" into input "description_input_layout"
    And I hide the keyboard    
    Then I press save    
    Then I see "Account name"

Scenario Outline: Create a subaccount with several names and descriptions 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter <account_name> into input "name_text_input_layout"    
    Then I enter <account_description> into input "description_input_layout"
    And I hide the keyboard        
    Then I press save
    Then I see <account_name>

  Examples:
    |     account_name          |    account_description    |
    |    "Cuenta de ahorros"    |   "Cuenta de colpatria"   |        
    |    "%/%/%%/1231%/&%()"    |  "&&%ññ23%/$&/&)()??)=)=?"|     

Scenario: Create a subaccount with an empty name 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount    
    And I hide the keyboard        
    Then I press save
    Then I see "Enter an account name to create an account" 

Scenario: Create a subaccount with an empty description 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter "Account name" into input "name_text_input_layout"        
    And I hide the keyboard
    Then I press save
    Then I see "Account name" 

Scenario: Create a subaccount without select the placeholder account checkbox 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter "No placeholder account" into input "name_text_input_layout"
    Then I enter the account description
    And I hide the keyboard    
    Then I press save
    Then I wait 2 seconds
    Then I see "Sub-Accounts" 
    Then I press "No placeholder account"  
    Then I see "Transactions"   

Scenario: Create a subaccount and select the placeholder account checkbox 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter "Placeholder account" into input "name_text_input_layout"
    Then I enter the account description
    And I hide the keyboard
    Then I press "Placeholder account"
    Then I press save
    Then I wait 2 seconds
    Then I see "Sub-Accounts" 
    Then I press "Placeholder account"  
    Then I don't see "Transactions"    

Scenario: Create a subaccount and add it to favorites 
    Then I press "Assets"
    Then I press "Current Assets"
    Then I press create subaccount
    Then I enter "Account name" into input "name_text_input_layout"        
    And I hide the keyboard
    Then I press save
    Then I see "Account name" 
    Then I press "Account name"
    Then I press "Navigation drawer opened"
    Then I wait 2 seconds
    Then I press "Favorites"
    Then I see "Account name"