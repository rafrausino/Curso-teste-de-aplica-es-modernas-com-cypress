/// <reference types="cypress" />

describe("Work with alets", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  beforeEach(() => {
    cy.reload();
  });

  it("Prompt...", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("42");
    });
    cy.on("window:confirm", (msg) => {
      expect(msg).to.be.equal("Era 42?");
    });
    cy.on("window:alert", (msg) => {
      console.log(msg);
      expect(msg).to.be.equal(":D");
    });
    cy.get("#prompt").click();
  });

  it("Deny...", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.be.equal("Confirm Simples");
      return false;
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.be.equal("Negado");
    });
    cy.get("#confirm").click();
  });
});
