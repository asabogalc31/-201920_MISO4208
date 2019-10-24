Feature: Manage prestashop site

  @newProduct
  Scenario Outline: Create an success simple product
    Given I go to prestashop site
    And I log in with user <User> and password <Password>
    When I select Catálogo menu option and Productos submenu option
    And I create a new product

    Examples:
      | User                       | Password |
      | Jf.laverde@uniandes.edu.co | 12345678 |
