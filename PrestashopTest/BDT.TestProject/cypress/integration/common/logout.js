import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^I log out from admin site$/, () => {
    // Shows menu
    cy.get("#header").find('i[class="material-icons js-mobile-menu"]').click();

    // Selects log out menu option
    var menuElement = cy.get('.main-menu')
    .find('li[class="link-levelone"]')
    .find('a[id="header_logout"]')
    .click();

    cy.screenshot('Logout');
});