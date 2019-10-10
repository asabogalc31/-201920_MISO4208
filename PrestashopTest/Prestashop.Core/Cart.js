const core = require('./Core')()

module.exports = function() {
    /**
     * Checkout for shopping cart products
     * @param {int} amountItems The amount of items selected per product to add to the shopping cart
     */
    function checkoutCart(amountItems){
        var totalExpected = 0;
        var currentMatch;
        var totalShopping = 0;
        var cartSummaryElement = ".cart-summary";

        cy.get('.cart-items').find('.cart-item').then(($cartItems) => {
            // Get the expected total per product
            cy.get('.current-price span').then(($unitValue) => {
                console.log($unitValue.length);
                var expectedMatch = core.getMatchWithPattern(/\d+\,\d+/, $unitValue.text()).replace(",", ".");
                totalExpected += parseFloat(expectedMatch) * parseFloat(amountItems);
            })

            // Validate the expected total with the current total per product
            cy.get('span.product-price').invoke('text').should(($currentTotal) => {
                currentMatch = core.getMatchWithPattern(/\d+\,\d+/, $currentTotal).replace(",", ".");
                expect(totalExpected).equal(parseFloat(currentMatch));
                return (totalShopping += parseFloat(currentMatch));
            })
        }).then(($currentFinalTotal)=>{
            // Validate the total of the shopping cart
            cy.get(cartSummaryElement)
            .find('div.cart-summary-line.cart-total')
            .find('span.value')
            .invoke('text')
            .should(($total) => {
                var totalMatch = core.getMatchWithPattern(/\d+\,\d+/, $total).replace(",", ".");
                var actualTotal = core.getMatchWithPattern(/\d+\,\d+/, $currentFinalTotal).replace(",", ".");
                expect(parseFloat(totalMatch)).equal(parseFloat(actualTotal));
            });
        })

        // Does click on checkout cart button
        cy.get(cartSummaryElement)
        .find('.text-sm-center')
        .find('a')
        .click();        
    }

    /**
     * Remove product in shopping cart
     */
    function removeProduct(){
        cy.get('.cart-items').find('a.remove-from-cart').click({multiple: true});
    }

   /**
    * Fills the form
    * @param {*} cartInfo The information to fills the form
    * @param {*} isGuest True if is a guest. False otherwise.
    */
    function fillForm(cartInfo, isGuest){
        // Fill personal information form
        personalForm(cartInfo.personalInfo, isGuest);

        // Fill addresses form
        addresessForm(cartInfo.addressInfo, isGuest);

        // Fill submission form
        submissionForm();

        // Fill payment form
        paymentForm();
    }

    /**
     * Fills personal form with the information specified on the object
     * @param {Object} personalInfo An object with the personal information
     * @param {Boolean} isGuest True if is a guest. False otherwise.
     */
    function personalForm(personalInfo, isGuest) {
        cy.wait(2000);
        var formId;

        // User is signed in when is not a guest
        if(!isGuest) {   
            formId = "#login-form";
            cy.get('.content')
            .find('a.nav-link ').eq(1)
            .click();
        }
        
        // Is a guest
        if(isGuest) {    
            formId = "#customer-form";

            personalInfo.gender == 1 
                ? cy.get(formId).find('input[name="id_gender"][value="1"]').click():
                cy.get(formId).find('input[name="id_gender"][value="2"]').click();

            cy.get(formId).find('input[name="firstname"]').click().type(personalInfo.name);
            cy.get(formId).find('input[name="lastname"]').click().type(personalInfo.lastName);
            cy.get(formId).find('input[name="birthday"]').click().type(personalInfo.birthday);
            
            if(personalInfo.option){
                cy.get(formId).find('input[name="optin"]').click()
            }
            
            if(personalInfo.newsletter){
                cy.get(formId).find('input[name="newsletter"]').click()
            }
        }
        
        cy.get(formId).find('input[name="email"]').click().type(personalInfo.email);
        cy.get(formId).find('input[name="password"]').click().type(personalInfo.password);
        cy.get(formId).find('button.continue').click();
    }
    
    /**
     *  * Fills addresess form with the information specified on the object
     * @param {Object} addressInfo An object with the addresess information
     * @param {*} isGuest True if is a guest. False otherwise.
     */
    function addresessForm(addressInfo, isGuest) {
        cy.wait(2000);
        const formId = ".js-address-form";

        if (isGuest) {
            cy.get(formId).find('input[name="address1"]').click().type(addressInfo.address);
            cy.get(formId).find('input[name="postcode"]').click().type(addressInfo.postCode)
            cy.get(formId).find('input[name="city"]').click().type(addressInfo.city);
        }

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
        removeProduct : removeProduct 
    };
}