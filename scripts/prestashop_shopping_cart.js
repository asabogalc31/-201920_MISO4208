describe('Prestashop Shopping cart', function() {
    it('Visits prestashop and buys a predefined item', function() {
        cy.visit('https://localhost/prestashop')
     
        cy.get('.products').find('article[data-id-product="1"]').find('a.quick-view').click({force: true})
        cy.get('.modal-content').find('button.add-to-cart').click()
        cy.wait(2000)
        //Cart Info checkout
        cy.get('.modal-content').find('.cart-content-btn').find('a').click()
        cy.get('.cart-summary').find('a').first().click()
        //Llenar form Guest
        cy.wait(2000)
        cy.get('.js-customer-form').find('input[name="firstname"]').click().type('Marcus')
        cy.get('.js-customer-form').find('input[name="lastname"]').click().type('Fenix')
        cy.get('.js-customer-form').find('input[name="email"]').click().type('mfenix@coalition.net')
        cy.get('.js-customer-form').find('input[name="psgdpr"]').click()
        cy.get('.js-customer-form').find('button.continue').click()
        cy.wait(2000)
        cy.get('.js-address-form').find('input[name="address1"]').click().type('Fake street 123')
        cy.get('.js-address-form').find('input[name="city"]').click().type('Springfield')
        cy.get('.js-address-form').find('select[name="id_state"]').select('Washington')
        cy.get('.js-address-form').find('input[name="postcode"]').click().type('55578')
        cy.get('.js-address-form').find('button.continue').click()
        cy.wait(2000)
        cy.get('.delivery-options-list').find('button.continue').click()
        cy.wait(2000)
        cy.get('#checkout-payment-step').find('#payment-option-2').click()
        cy.get('#checkout-payment-step').find('input[name="conditions_to_approve[terms-and-conditions]"]').click()
        cy.get('#checkout-payment-step').find('#payment-confirmation').find('button').click()
        
        
    })
})