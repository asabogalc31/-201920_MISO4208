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
        })
    }
    
    /**
     * Add the quantity of items of the products to the shopping cart.
     * @param {int} amountItems The amount of items of the products 
     */
    function addProductToCart(amountItems){
        // Select product features quantity
        cy.get('#add-to-cart-or-refresh')
        .find('.product-quantity')
        .find('#quantity_wanted')
        .clear().type(amountItems);

        // Adds product to shopping cart
        cy.get('#add-to-cart-or-refresh')
        .find('.product-add-to-cart')
        .find('.product-quantity')
        .find('.add')
        .then(($button) => {
           /* if ($button.is(':disabled')){
                console.log('Botón no es visible--- pop up')
                cy.get('textarea[class="product-message"]').type("Text of tests");
                cy.get('button[name="submitCustomizedData"]').click();  
            }*/
            
            cy.get($button).click();
            cy.wait(2000); 
        })
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