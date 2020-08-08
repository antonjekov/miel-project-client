describe('Pages scenarious not logged in user', function () {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Register Page', function () {
       cy.get('a').contains('Register').click()
    });

    it('Login Page', function () {
        cy.get('a').contains('Login').click()
    });

    it('Contacts Page', function () {
       cy.get('a').contains('Contacts').click()
    });

    it('Shopping Cart not exist', function () {
        cy.get('a[href*="/shoppingCard"]').should('not.exist');
    });

    it('Logout not exist', function () {
        cy.contains('Logout').should('not.exist');
    });

});