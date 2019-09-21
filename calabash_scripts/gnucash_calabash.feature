Feature: Configuring and adding quantities to the list of assets

  Scenario: As a user I want to open gnucash for the first time and configure it
    Given I press "Siguiente"               
    #button to start the settings process
    And I press "USD"
    And I press "Siguiente"
    And I press "Crear cuentas por defecto"
    And I press "Siguiente"
    And I press "Desactivar informes de cuelgues"
    And I press "Siguiente"
    When I press "Hecho"    
    Then I should see "Cuentas"

  Scenario: As a user I want to add quantities to the list of assets by default
    Given I press "Activo"                
    And I press "Activo circulante"
    And I press "Cuenta de ahorros"    
    And I press "fab_create_transaction"
    And I enter "100000" into "input_transaction_amount"
    And I press "Guardar"
    Then I should see "Cuentas"
