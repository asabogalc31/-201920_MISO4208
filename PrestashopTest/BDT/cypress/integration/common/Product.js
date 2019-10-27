import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import data from '../../fixtures/data.json';
import dataClient from '../../../../E2E/cypress/fixtures/data.json';

const newProduct = require('../scripts/newProductForm')();
const core = require('../../../../Prestashop.Core/Core')();
const product = require('../../../../Prestashop.Core/Product')()
const cart = require('../../../../Prestashop.Core/Cart')()

When(/^I create a new (.*) product$/, (productName) => {
    var productInfo = data.product.filter(p => p.basic.name === productName)[0];

    cy.get('.title-row')
    .find('a[class="btn btn-primary  pointer"]')
    .click();
    
    // Close toolbar
    cy.get('body')
        .find('div[class="sf-toolbar sf-display-none"]')
        .find('a[class="hide-button"]').click();

    // Fills basic product info on form
    newProduct.fillBasicForm(productInfo.basic);

    // Fills transport info
    cy.get('#form').find('#form-nav').find('#tab_step4').click();
    newProduct.fillTransportForm(productInfo.transport);

    // Activate product
    cy.get('#form')
        .find('div[class="product-footer justify-content-md-center"]')
        .find('div').eq(1)
        .click();
        
    // Save button
    cy.get('#form').find('button').contains('Guardar').click();

    //Assert
    cy.get('body')
        .find('div[class="growl-message"]')
        .should('contain', 'Configuración actualizada.');
});

Then(/^I as a client (.*) buy a (.*) product$/, (id, productName) => {   
    var idClient =  parseInt(id) - 1;
    var productInfo = data.product.filter(p => p.basic.name === productName)[0];

    // Selects a menu option
    core.selectMenu(dataClient.menuAccess.pMenu, dataClient.menuAccess.pSubm);
            
    // Assert page title
    (dataClient.menuAccess.pSubm == "" && dataClient.menuAccess.pSubm == null) ? 
        cy.get('.block-category').find('h1').should('contain', dataClient.menuAccess.pMenu):
        cy.get('.block-category').find('h1').should('contain', dataClient.menuAccess.pSubm);

    // Selects product specified
    cy.get('#header')
        .find('div[class="header-top"]')
        .find('div[class="row"]')
        .find('div').eq(1)
        .find('#search_widget')
        .find('form')
        .find('input').eq(1)
        .click()
        .type(productInfo.basic.name)
        .type('{enter}');

    product.selectRandomProduct();
    product.addProductToCart(dataClient.amountItems);
    
    // Assert modal header
    cy.wait(2000);
    cy.get('.modal-content')
        .find('.modal-header')
        .find('h4')
        .should('contain', 'Producto añadido correctamente a su carrito de compra');

    // Continues shopping
    product.selectModalOption(false);

    // Checkout cart
    cart.checkoutCart(dataClient.amountItems);
    cart.fillForm(dataClient.products[idClient], true);
    
    // Assert confirmed order
    cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
});

Then(/^I delete the (.*) product$/, (productName) => {
    var productInfo = data.product.filter(p => p.basic.name === productName)[0];

    // Filter products by name
    cy.get('#product_catalog_list')
        .find('[name="filter_column_name"]')
        .click()
        .clear()
        .type(productInfo.basic.name);
    cy.get('#product_catalog_list').find('button[class="btn btn-primary"]').click();
    
    // Select delete option
    cy.wait(2000);
    cy.get('tbody').eq(0)
        .find('tr')
        .find('td').last()
        .find('button').click();
    cy.wait(2000);
    cy.get('div[class="btn-group show"]')
        .find('div')
        .find('a')
        .find('i')
        .contains('delete').click();
    
    // Accept delete products
    cy.get('#catalog_deletion_modal')
        .find('div[class="modal-dialog "]')
        .find('div[class="modal-footer"]')
        .find('button').last()
        .click();

    //Assert
    const msg = "El producto se eliminó correctamente.";
    cy.get('#main-div')
        .find('div[class="content-div  "]')
        .find('div[class="row "]')
        .find('div').first()
        .find('div').eq(1)
        .find('.alert-text')
    expect(msg);
});