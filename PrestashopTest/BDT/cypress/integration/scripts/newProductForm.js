module.exports = function() {
    const form = '#form';

    /**
     * Fills the basic product information on the form with the information of product specified
     * @param {Object} product 
     */
    function fillBasicForm(product) {
        cy.get(form).find('#form_step1_name_1').click().type(product.name); //Name

        //Summary
        cy.get('#form_step1_description_short_1_ifr').then(function($iframe){
            var body = $iframe.contents().find("body");            
            cy.get(body).find('p').click().type(product.summary);
        });

        // Combinations
        var combinations = cy.get(form).find("#show_variations_selector").find('div');
        product.simpleProduct ? combinations.eq(0).click() : combinations.eq(1).click();
        
        cy.get(form).find('#form_step6_reference').click().type(product.reference); //Reference        
        cy.get(form).find('#form_step1_qty_0_shortcut').click().type(product.quantity); //Quantity
        cy.get(form).find('#form_step1_price_shortcut').clear().type(product.price).type('{enter}'); // Price
        
        // Select taxes option
        selectTaxes(product.includeTaxes)

        // Select category
        selectCategory(product.category);
    }

    /**
     * Fills the transport information on the form with the information of product specified
     * @param {Object} product 
     */
    function fillTransportForm(product) {
        cy.get(form).find('input[id="form_step4_width"]').clear().type(product.width);
        cy.get(form).find('input[id="form_step4_height"]').clear().type(product.height);
        cy.get(form).find('input[id="form_step4_depth"]').clear().type(product.depth);
        cy.get(form).find('input[id="form_step4_weight"]').clear().type(product.weight);
    }

    /**
     * Selects taxes option. True when includes taxes. False otherwise.
     * @param {Boolean} includeTaxes 
     */
    function selectTaxes(includeTaxes){
        cy.get(form).find('div[class="form-group mb-4"]')
        .eq(2)
        .find('div[class="row"]')
        .find('div[class="col-md-12 mt-1"]')
        .find('span[class="select2-selection select2-selection--single"]')
        .click()

        var content = cy.get('span[class="select2-container select2-container--bootstrap select2-container--open"]')
            .find('span[class="select2-results"]')
            .find('ul')
            .find('li');
            includeTaxes ? content.eq(1).click() : content.eq(0).click();
    }

    /**
     * Selects the category specified in the basic form
     * @param {String} category 
     */
    function selectCategory(category) {        
        var categoriesList = cy.get(form)
            .find('#form_step1_categories')
            .find('ul')
            .find('li[class="less"]').eq(0)
            .find('ul')
            .find('li')
            .find('label')
            .contains(category)
            .click();
    }

    return {
        fillBasicForm: fillBasicForm,
        fillTransportForm: fillTransportForm
    };
}