describe('Add product form behaviour', function(){
    
    it('Add product form all inputs works', function(){
        cy.visit('http://localhost:3000/')
        cy.get('a[href*="/login"]').contains('Login').click()
        cy.get('input[name=username]').type('admin@yahoo.com')
        cy.get('input[name=password]').type('123456')
        cy.get('button[type=submit]').contains('Login').click()
        cy.get('a[href*="/add-product"]').contains('Add Product').click()
        cy.get('input[name=name]').type('cypress product').should('have.value', 'cypress product')
        cy.get('select[name=category]').select('honey')
        cy.get('select[name=subcategory]').select('acacia')
        cy.get('input[name=price]').clear().type(10).should('have.value',10)
        cy.get('input[name=discount]').clear().type(10).should('have.value',10)
        cy.get('select[name=availability]').select('Available')
        cy.get('label').contains('Click to add product image').click()
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('button').contains('Cancel')        
    })
})