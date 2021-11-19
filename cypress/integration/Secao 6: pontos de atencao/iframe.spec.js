/// <reference types="cypress" />

describe("Desafio: Validar mensagens", () => {
  cy.visit("https://wcaquino.me/cypress/componentes.html");

  it("Deve preencher campo de texto", () => {
    cy.get("#frame1").then(iframe => {
        const body = iframe.contents().find('body')
        cy.wrap(body)
            .find('#tfield')
            .type('funciona?')
            .should('have.value', 'funciona?')
    })
  });

  it("Deve preencher campo de texto", () => {
    cy.visit("https://wcaquino.me/cypress/frame.html");
    cy.wrap(body).find('#otherButton').click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Click OK!')
    })
  });
});
