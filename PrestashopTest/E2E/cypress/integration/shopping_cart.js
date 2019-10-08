const core = require('../../scripts/Core')()
const product = require('../../scripts/Product')()
const cart = require('../../scripts/Cart')()

//Cantidad items del mismo producto
const prodqtt = 1;

//Cantidad de productos
const numProd = 2;

//Eliminar Productos del carrito
const delPro = true;

const prestaMenu = {
    pMenu : 'Accesorios',
    pSubm : 'Home Accessories'
}

//Información Usuario del carrito
const cartInfo = {
    personalInfo: {
        gender:'1',
        name: 'Michael',
        lastaName: 'Fenix',
        email: 'mfenixco@coalition.net',
        password: '',
        birthday: '',
        optin: false,
        newsletter: false,
        psgdpr: false
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
    
    describe('Shopping cart', function() {
        it('Guest user, visits prestashop and buys an item successfully', function() {               
            // Selects a menu option
            //let menu = prestaMenu.pMenu;
            //let subMenu = 'Home Accessories';
            core.selectMenu(prestaMenu.pMenu, prestaMenu.pSubm);
            
            // Assert page title
            (prestaMenu.pSubm == "" && prestaMenu.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', prestaMenu.pMenu):
                cy.get('.block-category').find('h1').should('contain', prestaMenu.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(prodqtt);
            
            // Assert modal header
            cy.wait(5000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(numProd, delPro);
            cart.fillForm(cartInfo);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it('User visits prestashop, create account and buys an item successfully', function() {
            // Selects a menu option
            core.selectMenu(prestaMenu.pMenu, prestaMenu.pSubm);
            
            // Assert page title
            (prestaMenu.pSubm == "" && prestaMenu.pSubm == null) ? 
                cy.get('.block-category').find('h1').should('contain', prestaMenu.pMenu):
                cy.get('.block-category').find('h1').should('contain', prestaMenu.pSubm);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart(prodqtt);
            
            // Assert modal header
            cy.wait(5000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(numProd, delPro);
            cart.fillForm(cartInfo);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it('Guest user, visits prestashop and buys various items successfully', function() {
            //Multipres productos y cantidad de productos
            for(var qp = 0; qp < numProd; qp++){
                cy.get('#top-menu')
				.find('a')
				.contains(prestaMenu.pSubm)
				.trigger('show', {force:true})
				.click({force:true});
            
                // Assert page title
                (prestaMenu.pSubm == "" && prestaMenu.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pMenu):
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(prodqtt);
            }
            
            // Assert modal header
            cy.wait(5000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(numProd, delPro);
            cart.fillForm(cartInfo);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it('User visits prestashop, create account and buys various items successfully', function() {
            //Multipres productos y cantidad de productos
            for(var qp = 0; qp < numProd; qp++){
                cy.get('#top-menu')
				.find('a')
				.contains(prestaMenu.pSubm)
				.trigger('show', {force:true})
				.click({force:true});
            
                // Assert page title
                (prestaMenu.pSubm == "" && prestaMenu.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pMenu):
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(prodqtt);
            }
            
            // Assert modal header
            cy.wait(5000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart(numProd, delPro);
            cart.fillForm(cartInfo);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        }),

        it('User visits prestashop add items to the cart and delete them', function() {
             //Multipres productos y cantidad de productos
             for(var qp = 0; qp < numProd; qp++){
                cy.get('#top-menu')
				.find('a')
				.contains(prestaMenu.pSubm)
				.trigger('show', {force:true})
				.click({force:true});
            
                // Assert page title
                (prestaMenu.pSubm == "" && prestaMenu.pSubm == null) ? 
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pMenu):
                    cy.get('.block-category').find('h1').should('contain', prestaMenu.pSubm);

                // Select a random product
                product.selectRandomProduct();
                product.addProductToCart(prodqtt);
            }
            
            // Assert modal header
            cy.wait(5000);
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart();
            cart.deleteCart();

        })
    })
})