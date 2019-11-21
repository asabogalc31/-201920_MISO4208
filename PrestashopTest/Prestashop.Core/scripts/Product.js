module.exports = function() {
    /**
	 * Select a random product on the current page
	 */
	function selectRandomProduct(){
        cy.get('.pagination').find('div').then(($listItem) => {
            // Generate a random index of elements
            var txtTotalProducts = $listItem.text().match(/\s\d{1}\s/).toString().trim();
            var randomNumber = Math.floor(Math.random() * txtTotalProducts);
            
            // Item is selected
            cy.get('#js-product-list')
                .find('.row')
                .children()
                .eq(randomNumber)
                .click();
            cy.screenshot('selectRandomProduct');
        })
    }
    
    /**
     * Add the quantity of items of the products to the shopping cart.
     * @param {int} amountItems The amount of items of the products 
     */
    function addProductToCart(amountItems){
        // Select product features quantity
        cy.get('#add-to-cart-or-refresh')
            .find('.product-quantity').as('qProduct')        
        
        cy.get('@qProduct')
            .find('#quantity_wanted')
            .clear()
            .type(amountItems);

        cy.wait(2000);
        if (amountItems === 0) {
            cy.get('@qProduct').find('#quantity_wanted').invoke('val').should(($value) => {  
                expect(1).to.equal(parseInt($value));
            })
            return;
        }
        
        cy.screenshot('addProductToCart');

        // Adds product to shopping cart
        var children = cy.get('.product-information').children().its('length').then(numberElements =>{
            if(numberElements === 5){                
                cy.get('.product-customization')
                    .find('form').as('popUp');
                cy.get('@popUp').find('textarea[class="product-message"]').type("Text of tests");
                cy.get('@popUp').find('button[name="submitCustomizedData"]').click();
            }
    
            cy.get('#add-to-cart-or-refresh')
                .find('.product-add-to-cart')
                .find('.product-quantity')
                .find('.add')
                .then(($button) => {                
                    cy.get($button).click();
                })
        });
    }

    /**
     * Select an option in the modal message
     * @param {Boolean} continueShopping True if you want to continue shopping. False otherwise.
     */
    function selectModalOption(continueShopping){
        // Constants
        const modal = ".modal-content";
        var cartContent = cy.get(modal).find('.cart-content-btn');
        if (continueShopping) {
            cartContent.find('button[class="btn btn-secondary"]').click();
            return;
        }

        cartContent.find('a[class="btn btn-primary"]').click()
    }
    
    return {
        selectRandomProduct: selectRandomProduct,
        addProductToCart: addProductToCart,
        selectModalOption: selectModalOption
    };
}