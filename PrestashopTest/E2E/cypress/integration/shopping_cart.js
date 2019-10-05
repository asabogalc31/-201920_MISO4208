const cartInfo = {
    personalInfo: {
        recipient:'sr',
        name: 'Michael',
        lastaName: 'Fenix',
        email: 'mfenixc@coalition.net',
        password: 'Password1234',
        dateOfBirth: '05/10/1987',
        receiveOffers: true,
        newBulletin: true
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

const core = require('../../scripts/Core')()
const product = require('../../scripts/Product')()
const cart = require('../../scripts/Cart')()

context('As an user I want to buy an item on the prestashop site', function() {
	beforeEach(function() {
		core.openSite();
    })
    
    describe('Shopping cart', function() {
        it('Visits prestashop and buys an item successfully', function() {               
            // Selects a menu option
            let menu = 'Clothes';
            let subMenu = 'Women';
            core.selectMenu(menu, subMenu);

            // Assert page title
            (subMenu == "" && subMenu == null) ? 
                cy.get('.block-category').find('h1').should('contain', menu):
                cy.get('.block-category').find('h1').should('contain', subMenu);

            // Select a random product
            product.selectRandomProduct();
            product.addProductToCart();

            // Assert modal header
            cy.get(".modal-content")
                .find('.modal-header')
                .find('h4')
                .should('contain', 'Producto añadido correctamente a su carrito de compra');
            // Continues shopping
            product.selectModalOption(false);

            // Checkout cart
            cart.checkoutCart();
            cart.fillForm(cartInfo);
            
            // Assert confirmed order
            cy.get('#content-hook_order_confirmation').find('h3').should('contain', 'Su pedido está confirmado');
        })
    })
})