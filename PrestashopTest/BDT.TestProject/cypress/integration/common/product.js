import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import data from '../../../../Prestashop.Core/fixtures/data.json'

const newProduct = require('../scripts/newProductForm')();
const core = require('../../../../Prestashop.Core/scripts/Core')();
const product = require('../../../../Prestashop.Core/scripts/Product')()
const cart = require('../../../../Prestashop.Core/scripts/Cart')()

When(/^I create a new product with status active (.*) with the input data of position (.*)$/, (isActive, dataObject) => {
    cy.get('.title-row')
        .find('a[class="btn btn-primary  pointer"]')
        .click();
    
    // Close toolbar
    cy.get('body')
        .find('div[class="sf-toolbar sf-display-none"]')
        .find('a[class="hide-button"]')
        .click();

    // Fills basic product info on form
    var category = data[dataObject].menuAccess.pSubm ? data[dataObject].menuAccess.pMenu : data[dataObject].menuAccess.pSubm;
    newProduct.fillBasicForm(data[dataObject].product.basic, category);

    // Fills transport info
    cy.get('#form')
        .find('#form-nav')
        .find('#tab_step4')
        .click();
    newProduct.fillTransportForm(data[dataObject].product.transport);

    // Activate product
    if(JSON.parse(isActive)){
        cy.get('#form')
            .find('div[class="product-footer justify-content-md-center"]')
            .find('div').eq(1)
            .click();
    }
    
    cy.screenshot('CreateNewProduct');
    // Save button
    cy.get('#form').find('button').contains('Guardar').click();

    //Assert
    cy.get('body')
        .find('div[class="growl-message"]')
        .should('contain', 'Configuración actualizada.');
});

Then(/^I as a (.*) client want to buy a product with the input data of position (.*)$/, (clientType, dataObject) => {
    // Selects a menu option
    core.selectMenu(data[dataObject].menuAccess.pMenu, data[dataObject].menuAccess.pSubm);
            
    // Assert page title
    (data[dataObject].menuAccess.pSubm == "" && data[dataObject].menuAccess.pSubm == null) ? 
        cy.get('.block-category').find('h1').should('contain', data[dataObject].menuAccess.pMenu):
        cy.get('.block-category').find('h1').should('contain', data[dataObject].menuAccess.pSubm);

    
    // Selects product specified
    cy.get('#header')
        .find('div[class="header-top"]')
        .find('div[class="row"]')
        .find('div').eq(1)
        .find('#search_widget')
        .find('form')
        .find('input').eq(1)
        .click()
        .type(data[dataObject].product.basic.name)
        .type('{enter}');

    product.selectRandomProduct();
    product.addProductToCart(data[dataObject].amountItems);

    // Assert modal header
    cy.wait(2000);
    cy.get('.modal-content')
        .find('.modal-header')
        .find('h4')
        .should('contain', 'Producto añadido correctamente a su carrito de compra');

    // Continues shopping
    product.selectModalOption(false);

    // Checkout cart
    cart.checkoutCart(data[dataObject].amountItems);
    var isGuest = true;
    if(clientType != "guest"){
        isGuest = false;
    }
    cart.fillForm(data[dataObject].client, isGuest);
    
    // Assert confirmed order
    cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
});

Then(/^I delete the product with the input data of position (.*)$/, (dataObject) => {
    // Filter products by name
    cy.get('#product_catalog_list')
        .find('[name="filter_column_name"]')
        .click()
        .clear()
        .type(data[dataObject].product.basic.name);
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
    
    cy.screenshot('DeleteProduct');
    
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