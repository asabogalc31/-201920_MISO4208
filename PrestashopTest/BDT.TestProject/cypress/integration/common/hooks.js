afterEach(function () {
    cy.get("#header").find('i[class="material-icons js-mobile-menu"]').click();
    cy.get('.main-menu')
            .find('li[class="link-levelone"]')
			.find('span')
            .contains('Cerrar sesión');
})