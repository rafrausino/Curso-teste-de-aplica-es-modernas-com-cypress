/// <reference types="cypress" />

it('Invoke...', () => {
    const getValue = () => 1;
    const soma = (a, b) => a + b;
    
    cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window.invoke('alert', 'Dá pra ver?')
    cy.get('#resultado')
        .invoke('html',  '<input type="button", value="hacked!"/>')

});