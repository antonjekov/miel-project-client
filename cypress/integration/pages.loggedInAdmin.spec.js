describe('Pages scenarious logged in user admin', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('a').contains('Login').click()
        cy.get('input[name=username]').type('admin@yahoo.com')
        cy.get('input[name=password]').type('123456')
        cy.get('button[type=submit]').contains('Login').click()
    })

    it('Add Product', function () {
        cy.get('a[href*="/add-product"]').contains('Add Product').click()
    });

    it('Add Subcategory', function () {
        cy.get('a[href*="/add-subcategory"]').contains('Add Subcategory').click()
    });

    it('Logout Page', function () {
        cy.contains('Logout').click()
    });

    it('Contacts Page', function () {
        cy.get('a[href*="/contacts"]').contains('Contacts')
    });

    it('Login not exist', function () {
        cy.get('a[href*="/login"]').should('not.exist');
    });

    it('Shopping Card Page', function () {
        cy.get('a[href*="/shoppingCard"]').should('not.exist')
    });
})