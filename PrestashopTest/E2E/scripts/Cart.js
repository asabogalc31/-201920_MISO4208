module.exports = function() {
    /**
     * Checkout for shopping cart products
     */
    function checkoutCart(item, delItems){
        
        //Assert
        
        cy.get('.cart-items').find('.cart-item').then(($cartItems) => {
            //for(var qp = 0; qp < item; qp++){
                console.log($cartItems.get());
                //cy.get(cartItems[qp])
            //}
            //cy.get('.current-price').find('span').invoke('text')
            //console.log(cartItems.text());
            cy.get('.current-price span').invoke('text').then((text1) => {
                // do more work here
                //console.log(text1.replace(' $',''));
                // grab the div again and compare its previous text
                // to the current text
                cy.get('.cart-overview .current-price span').invoke('text').should((text2) => {
                  expect(text1).eq(text2)
                })
              })
            //}
        })

        cy.get('.cart-summary')
        .find('.text-sm-center')
        .find('a')
        .click();
    }

    /**
     * Delte Im
     */
    function deleteCart(){
        cy.get('.cart-items').find('a.remove-from-cart').click({multiple: true});

        //Assert
        cy.get('.cart-overview').find('span').should('contain', 'No hay más artículos en su carrito');
    }

    /**
     * Fills the form
     */
    function fillForm(cartInfo){
        // Fill personal information form
        personalForm(cartInfo.personalInfo);

        // Fill addresses form
        addresessForm(cartInfo.addressInfo);

        // Fill submission form
        submissionForm();

        // Fill payment form
        paymentForm();
    }

    /**
     * Fills personal form with the information specified on the object
     * @param {Object} personalInfo 
     */
    function personalForm(personalInfo) {
        cy.wait(2000);
        const formId = "#customer-form";

        cy.get(formId).find('input[name="firstname"]').click().type(personalInfo.name);
        cy.get(formId).find('input[name="lastname"]').click().type(personalInfo.lastaName);
        cy.get(formId).find('input[name="email"]').click().type(personalInfo.email);
        
        //Crear cliente
        if(personalInfo.password != ''){
            cy.get(formId).find('input[name="password"]').click().type(personalInfo.password);
            cy.get(formId).find('input[name="birthday"]').click().type(personalInfo.birthday);
        }
        
        if(personalInfo.optin == true){
            cy.get(formId).find('input[name="optin"]').click()
        }
        
        if(personalInfo.newsletter == true){
            cy.get(formId).find('input[name="newsletter"]').click()
        }
        
        if(personalInfo.psgdpr == true){
            cy.get(formId).find('input[name="psgdpr"]').click()
        }
        
        cy.get(formId).find('button.continue').click();
    }
    
    /**
     * Fills addresess form with the information specified on the object
     * @param {Object} addressInfo 
     */
    function addresessForm(addressInfo) {
        cy.wait(2000);
        const formId = ".js-address-form";
        cy.get(formId).find('input[name="address1"]').click().type(addressInfo.address);
        cy.get(formId).find('input[name="postcode"]').click().type(addressInfo.postCode)
        cy.get(formId).find('input[name="city"]').click().type(addressInfo.city);
        cy.get(formId).find('button.continue').click()
    }
    
    /**
     * Fills submission form with the information specified on the object
     */
    function submissionForm() {
        cy.wait(2000);

        // Generate a random index of elements
        const formId = ".delivery-options-list";
        cy.get(formId).find('.delivery-option').its('length').then(($length) => {
            var randomElement = Math.floor(Math.random() * $length);

            // Carrier is selected
            cy.get(formId)
            .find('.delivery-option')
            .eq(randomElement)
            .click();
        });

        cy.get(formId).find('button.continue').click()
    }
    
    /**
     * Fills payment form with the information specified on the object
     */
    function paymentForm() {
        cy.wait(2000);
        const formId = "#checkout-payment-step";

        // TODO: Permitir la slección del tipo de pago a través de parámetro pasado por el usuario
        cy.get(formId).find('#payment-option-2').click()
        cy.get(formId).find('input[name="conditions_to_approve[terms-and-conditions]"]').click()
        cy.get(formId).find('#payment-confirmation').find('button').click()
    }    

    return {
        checkoutCart: checkoutCart,
        fillForm: fillForm,
        deleteCart: deleteCart
    };
}