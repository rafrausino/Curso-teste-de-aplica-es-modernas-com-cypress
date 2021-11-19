/// <reference types="cypress" />

it('Its...', () => {
    const obj = { nome: "User", idade: 20 }
    cy.wrap(obj).should('have.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal', 'User')

    const obj2 = { nome: "User", idade: 20, endereco: { rua: 'dos bobos'} }
    cy.wrap(obj2).its('endereco').should('have.property', 'rua')
    cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
    cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.title().its('length').should('be.equal', 20)
});