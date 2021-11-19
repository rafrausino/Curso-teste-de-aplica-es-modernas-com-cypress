/// <reference types="cypress" />

describe("Work with basic elements", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  beforeEach(() => {
    cy.reload();
  });

  it("Combo", () => {
    cy.get("[data-test=dataEscolaridade]")
      .select("2o grau incompleto")
      .should("have.value", "2grauincomp");

    cy.get("[data-test=dataEscolaridade]")
      .select("Doutorado")
      .should("have.value", "doutorado");

    cy.get("[data-test=dataEscolaridade] option").should("have.length", 8);
    cy.get("[data-test=dataEscolaridade] option").then(($arr) => {
      const values = [];
      $arr.each(function () {
        values.push(this.innerHTML);
      });
      expect(values).to.include.members(["Superios", "Mestrado"]);
      //TODO validar opções do combo
    });

    it("Combo Multiplo", () => {
      cy.get("[data-testid=dataEsportes]").select([
        "natacao",
        "Corrida",
        "nada",
      ]);

      // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao','Corrida', 'nada'])
      cy.get("[data-testid=dataEsportes]").then(($el) => {
        expect($el.val()).to.be.deep.equal(["natacao", "Corrida", "nada"]);
        expect($el.val()).to.have.length(3);
      });

      cy.get("[data-testid=dataEsportes]")
        .invoke("val")
        .should("eql", ["natacao", "Corrida", "nada"]);

      //TODO validar opções  selecionadas do combo multiplo
    });
  });
});
