/// <reference types="cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: "User", idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').then($el => {
            $el.val('funciona via Jquery')
            cy.wrap($el).type('funciona via Cypress')
        })
    });
});