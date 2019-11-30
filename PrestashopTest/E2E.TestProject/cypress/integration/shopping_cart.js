/**
 * Import scripts
 */
const core = require('../../../Prestashop.Core/scripts/Core')()
const product = require('../../../Prestashop.Core/scripts/Product')()
const cart = require('../../../Prestashop.Core/scripts/Cart')()

import jsonFile from '../../../Prestashop.Core/fixtures/data.json'

var data = "";

context('As an user I want to buy an item on the prestashop site', function() {    
    beforeEach(function () {   
        var rndItem = Math.floor(Math.random() * jsonFile.length);  
        data = jsonFile[rndItem];

        core.openSite(data.url.client)
    })

    describe('Shopping cart - Guest user visits prestashop', function() {
        it('Creates an account and buys an item successfully', function() {
            // Selects a menu option
            core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);
            
            // Assert page title
            (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(data.amountItems);
            
            // Assert modal header
            cy.wait(2000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(data.amountItems);
            cart.fillForm(data.client, true);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
            
        }),
       
        it('Creates an account and buys various items successfully', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(data.amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (data.amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (data.amountProducts -1)) {
                    product.selectModalOption(false);
                }
            }
            
            // Checkout cart
            cart.checkoutCart();
            cart.fillForm(data.client, true);

            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        })
    })

    describe('Shopping cart - User registered visits prestashop', function() {
        it('Buys an item successfully', function() {
            // Selects a menu option
            core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);
            
            // Assert page title
            (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(data.amountItems);
            
            // Assert modal header
            cy.wait(2000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(data.amountItems);
            cart.fillForm(data.client, false);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),
        
        it('Buys various items successfully', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(data.amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (data.amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (data.amountProducts -1)) {
                    product.selectModalOption(false);
                }
            }
            
            // Checkout cart
            cart.checkoutCart(data.amountItems);
            cart.fillForm(data.client, false);

            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it('Adds zero items to the shopping cart', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(0);
            }
        })

        it('Adds the limit of items allowed per product to the shopping cart', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                cy.get('#add-to-cart-or-refresh')
                .find('.product-quantity').as('qProduct')        
                
                cy.get('@qProduct')
                .find('#quantity_wanted')
                .clear()
                .type(3000);

                // Assert
                cy.wait(2000);
                cy.get('div.product-add-to-cart')
                .find('#product-availability')
                .invoke('text')
                .as('amountArticles');
                cy.get('#add-to-cart-or-refresh').children().its('length').then(articleElement =>{
                    if(articleElement !== 7){
                        cy.get('@amountArticles').should('contain','Producto disponible con otras opciones');
                        return;
                    }

                    cy.get('@amountArticles')
                    .should('contain','No hay suficientes productos en stock');
                });
            }
        })

        it('Exceeds the limit of items allowed per product to the shopping cart', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                cy.get('#add-to-cart-or-refresh')
                .find('.product-quantity').as('qProduct')        
                
                cy.get('@qProduct')
                .find('#quantity_wanted')
                .clear()
                .type(99999999);

                // Assert
                cy.wait(2000);
                cy.get('div.product-add-to-cart')
                .find('#product-availability')
                .invoke('text')
                .as('amountArticles');
                cy.get('#add-to-cart-or-refresh').children().its('length').then(articleElement =>{
                    if(articleElement !== 7){
                        cy.get('@amountArticles').should('contain','Producto disponible con otras opciones');
                        return;
                    }

                    cy.get('@amountArticles')
                    .should('contain','No hay suficientes productos en stock');
                });
            }
        })

        it('Add items to the cart and delete them', function() {
            for(var p = 0; p < data.amountProducts; p++){
                // Selects a menu option
                core.selectMenu(data.menuAccess.pMenu, data.menuAccess.pSubm);

                // Assert page title
                (data.menuAccess.pSubm == "" && data.menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', data.menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(data.amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (data.amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (data.amountProducts -1)) {
                    product.selectModalOption(false);
                }
            }

            // Checkout cart
            cart.removeProduct();
            cy.wait(2000); 
            cy.get(".cart-overview")
            .find('span[class="no-items"]')
            .invoke('text')
            .should(($message) => {
                expect($message).to.contain('No hay más artículos en su carrito');
            });
        })
    })
})