import { When } from 'cypress-cucumber-preprocessor/steps';
import data from '../../fixtures/data.json';

const newProduct = require('../scripts/newProductForm')();

When(/^I create a new product$/, () => {
    cy.get('.title-row')
    .find('a[class="btn btn-primary  pointer"]')
    .click();
    
    // Close toolbar
    cy.get('body')
        .find('div[class="sf-toolbar sf-display-none"]')
        .find('a[class="hide-button"]').click();

    // Get random product
    var pos = Math.floor(Math.random() * data.product.length);
    // Fills basic product info on form
    newProduct.fillBasicForm(data.product[pos].basic);

    // Fills transport info
    cy.get('#form').find('#form-nav').find('#tab_step4').click();
    newProduct.fillTransportForm(data.product[pos].transport);

    // Save button
    cy.get('#form').find('button').contains('Guardar').click();

    cy.get('body')
        .find('div[class="growl-message"]')
        .should('contain', 'Configuración actualizada.');
});