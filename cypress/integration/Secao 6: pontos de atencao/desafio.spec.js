/// <reference types="cypress" />

describe('Desafio: Validar mensagens', () => {
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
      });
    
      beforeEach(() => {
        cy.reload();
      });
    
      it('Validando mensagens', () => {
        const stub = cy.stub().as('alert');
        cy.on('window:alert', stub)    
        cy.get('#formCadastrar').click()
            .then(() => expect.getCall(0)).to.be.getCallWith('Nome eh obrigatorio')
        cy.get('#formNome').type('Renan')
        
        cy.get('#formCadastrar').click()
            .then(() => expect.getCall(1)).to.be.getCallWith('Sobrenome eh obrigatorio')
        cy.get('[data-cy=dataSobrenome]').type('Afrausino')

        cy.get('#formCadastrar').click()
            .then(() => expect.getCall(2)).to.be.getCallWith('Sexo eh obrigatorio')
        cy.get('#formSexoMasc').click()

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')



    });        
});