import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When(/^I select (.*) menu option and (.*) submenu option$/, (menu, submenu) => {
    // Shows menu
    cy.get("#header").find('i[class="material-icons js-mobile-menu"]').click();

    // Selects menu option
    var menuElement = cy.get('.main-menu')
            .find('li[class="link-levelone has_submenu"]')
			.find('span')
            .contains(menu);
            
    menuElement.click();

    // Selects submenu option
    var subMenuElement = menuElement
            .parent('.link')
            .parent('li')
            .find('ul')
            .find('li[class="link-leveltwo "]')
            .find('a')
            .contains(submenu);

    subMenuElement.click();
});

Then(/^I select (.*) menu option and (.*) submenu option$/, (menu, submenu) => {
    // Shows menu
    cy.get("#header").find('i[class="material-icons js-mobile-menu"]').click();

    // Selects menu option
    var menuElement = cy.get('.main-menu')
            .find('li[class="link-levelone has_submenu"]')
			.find('span')
            .contains(menu);
            
    menuElement.click();

    // Selects submenu option
    var subMenuElement = menuElement
            .parent('.link')
            .parent('li')
            .find('ul')
            .find('li[class="link-leveltwo "]')
            .find('a')
            .contains(submenu);

    subMenuElement.click();
});