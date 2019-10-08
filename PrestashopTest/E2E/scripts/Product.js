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
     * Adds product to cart
     */
    function addProductToCart(qtt){
        // TODO: Select product features quantity
        cy.get('#add-to-cart-or-refresh')
        .find('.product-quantity')
        .find('#quantity_wanted')
        .clear().type(qtt);

        cy.get('#add-to-cart-or-refresh')
        .find('.product-add-to-cart')
        .find('.product-quantity')
        .find('.add')
        .click();

        cy.wait(2000);        
    }

    /**
     * Select an option in the modal message
     * @param {Boolean} continueShopping True if you want to continue shopping. False otherwise.
     */
    function selectModalOption(continueShopping){
        // Constants
        const modal = ".modal-content";
        var cartContent = cy.get(modal).find('.cart-content-btn');
        continueShopping ? cartContent.find('button').click() : cartContent.find('a').click();
    }
    
    return {
        selectRandomProduct: selectRandomProduct,
        addProductToCart: addProductToCart,
        selectModalOption: selectModalOption
    };
}