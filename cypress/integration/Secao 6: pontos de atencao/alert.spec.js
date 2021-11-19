/// <reference types="cypress" />

describe('Work with alets', () => {
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
      });
    
      beforeEach(() => {
        cy.reload();
      });

      it('Alert...', () => {
          cy.get('#alet').click();
          cy.on('window:alert', msg => {
              console.log(msg);
              expect(msg).to.be.equal('Alert Simples')
          })
      });

      it('Alert com mock', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#alet').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
         
    });
});