Feature: Create a new product

  Scenario Outline: Create an success simple product with status activated to a guest client
    Given I go to prestashop admin site with the input data of position <DataId>
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    When I select Catálogo menu option and Productos submenu option 
    And I create a new product with status active true with the input data of position <DataId>
    And I log out from admin site
    Then I go to client site with the input data of position <DataId>
    And I as a guest client want to buy a product with the input data of position <DataId>
    And I go to prestashop admin site with the input data of position <DataId>
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    And I select Catálogo menu option and Productos submenu option
    And I delete the product with the input data of position <DataId>

    Examples:
    |DataId|
    |{0}|

    Scenario Outline: Create an success simple product with status activated to a registered client
    Given I go to prestashop admin site with the input data of position <DataId>
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    When I select Catálogo menu option and Productos submenu option
    And I create a new product with status active true with the input data of position <DataId>
    And I log out from admin site
    Then I go to client site with the input data of position <DataId>
    And I as a guest client want to buy a product with the input data of position <DataId>
    And I as client I want to logout
    And I as a registered client want to buy a product with the input data of position <DataId>
    And I go to prestashop admin site with the input data of position <DataId>
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    And I select Catálogo menu option and Productos submenu option
    And I delete the product with the input data of position <DataId>
	
    Examples:
    |DataId|
    |{0}}|
