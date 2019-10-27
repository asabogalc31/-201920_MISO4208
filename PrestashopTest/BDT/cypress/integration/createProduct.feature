Feature: Create a new product
  Background:
    Given I go to prestashop site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678

  @newProduct
  Scenario Outline: Create an success simple product
    When I select Catálogo menu option and Productos submenu option
    And I create a new <Product> product
    And I log out from admin site
    Then I go to client site
    And I as a client <Id> buy a <Product> product
    And I go to prestashop site
    And I log in with user Jf.laverde@uniandes.edu.co and password 12345678
    And I select Catálogo menu option and Productos submenu option
    And I delete the <Product> product

    Examples:
      | Id | Product          |
      | 1  | Lion Pillow      |
      | 2  | Christmas Pillow |
