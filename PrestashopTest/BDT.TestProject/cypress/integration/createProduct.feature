Feature: Create a new product
  @newProduct @generateData
  Scenario: Create an success simple product with status activated to a guest client
    Given I go to prestashop admin site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    When I select Catálogo menu option and Productos submenu option
    And I create a new product with status active true
    And I log out from admin site
    Then I go to client site
    And I as a guest client want to buy a product
    And I go to prestashop admin site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    And I select Catálogo menu option and Productos submenu option
    And I delete the product

    @newProduct
    Scenario: Create an success simple product with status activated to a registered client
    Given I go to prestashop admin site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    When I select Catálogo menu option and Productos submenu option
    And I create a new product with status active true
    And I log out from admin site
    Then I go to client site
    And I as a registered client want to buy a product
    And I go to prestashop admin site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    And I select Catálogo menu option and Productos submenu option
    And I delete the product