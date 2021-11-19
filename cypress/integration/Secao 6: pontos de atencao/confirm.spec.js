/// <reference types="cypress" />

describe('Work with alets', () => {
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
      });
    
      beforeEach(() => {
        cy.reload();
      });

      it('Confirm...', () => {
          cy.on('window:confirm', msg => {
              console.log(msg);
              expect(msg).to.be.equal('Confirm Simples')
          })
          cy.on('window:alert', msg => {
            console.log(msg);
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click();
      });

      it('Deny...', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
          expect(msg).to.be.equal('Negado')
      })
      cy.get('#confirm').click();
    });
});