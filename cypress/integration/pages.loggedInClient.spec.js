describe('Pages scenarious logged in user client', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('a').contains('Login').click()
        cy.get('input[name=username]').type('anton@yahoo.com')
        cy.get('input[name=password]').type('123456')
        cy.get('button[type=submit]').contains('Login').click()
    })

    it('Logout Page', function () {
        cy.contains('Logout').click()
    });
    
    it('Shopping Card Page', function() {
        cy.get('a[href*="/shoppingCard"]').click()
    });

    it('Contacts Page', function() {
        cy.get('a[href*="/contacts"]').contains('Contacts')
    });

    it('Login not exist', function () {
        cy.get('a[href*="/login"]').should('not.exist');
    });
})