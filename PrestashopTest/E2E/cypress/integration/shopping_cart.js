/**
 * Import scripts
 */
const core = require('../../../Prestashop.Core/Core')()
const product = require('../../../Prestashop.Core/Product')()
const cart = require('../../../Prestashop.Core/Cart')()

// Amount of items per product
const amountItems = 2;

const amountProducts = 6;

const menuAccess = {
    pMenu : 'Accesorios',
    pSubm : 'Home Accessories'
}

//Información Usuario del carrito
const cartInfo = {
    personalInfo: {
        gender:'2',
        name: 'Michael',
        lastName: 'Fenix',
        email: 'mfenixdg@coalition.net',
        password: 'Prueba1234',
        birthday: '31/05/1985',
        option: false,
        newsletter: false
    },
    addressInfo:{
        address:'Fake street 123',
        complementaryAddress:'',
        postCode:'555718',
        city:'Bogotá',
        country:'Colombia',
        phoneNumber:'3137777777'
    }
};

const cartInfo2 = {
    personalInfo: {
        gender:'2',
        name: 'Michael',
        lastName: 'Fenix',
        email: 'mfenixdh@coalition.net',
        password: 'Prueba1234',
        birthday: '31/05/1985',
        option: false,
        newsletter: false
    },
    addressInfo:{
        address:'Fake street 123',
        complementaryAddress:'',
        postCode:'555718',
        city:'Bogotá',
        country:'Colombia',
        phoneNumber:'3137777777'
    }
};

context('As an user I want to buy an item on the prestashop site', function() {
	beforeEach(function() {
		core.openSite();
    })
    
    describe('Shopping cart - Guest user visits prestashop', function() {
        it.skip('Creates an account and buys an item successfully', function() {               
            // Selects a menu option
            core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);
            
            // Assert page title
            (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(amountItems);
            
            // Assert modal header
            cy.wait(2000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(amountItems);
            cart.fillForm(cartInfo, true);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),
       
        it.skip('Creates an account and buys various items successfully', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (amountProducts -1)) {
                    product.selectModalOption(false);
                }
            }
            
            // Checkout cart
            cart.checkoutCart();
            cart.fillForm(cartInfo2, true);

            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        })
    })

    describe('Shopping cart - User registered visits prestashop', function() {
        it.skip('Buys an item successfully', function() {
            // Selects a menu option
            core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);
            
            // Assert page title
            (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(amountItems);
            
            // Assert modal header
            cy.wait(2000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(amountItems);
            cart.fillForm(cartInfo, false);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),
        
        it.skip('Buys various items successfully', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (amountProducts -1)) {
                    product.selectModalOption(false);
                }
            }
            
            // Checkout cart
            cart.checkoutCart(amountItems);
            cart.fillForm(cartInfo, false);

            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it.skip('Adds zero items to the shopping cart', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(0);
            }
        })

        it('Adds the limit of items allowed per product to the shopping cart', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

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

        it.skip('Exceeds the limit of items allowed per product to the shopping cart', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

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

        it.skip('Add items to the cart and delete them', function() {
            for(var p = 0; p < amountProducts; p++){
                // Selects a menu option
                core.selectMenu(menuAccess.pMenu, menuAccess.pSubm);

                // Assert page title
                (menuAccess.pSubm == "" && menuAccess.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pMenu):
                    cy.get('.block-category').find('h1').should('contain', menuAccess.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(amountItems);

                // Assert modal header
                cy.wait(2000);
                cy.get(".modal-content")
                    .find('.modal-header')
                    .find('h4')
                    .should('contain', 'Producto añadido correctamente a su carrito de compra');

                // Continues shopping
                if (p != (amountProducts -1)) {
                    product.selectModalOption(true);
                }
                else if (p == (amountProducts -1)) {
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