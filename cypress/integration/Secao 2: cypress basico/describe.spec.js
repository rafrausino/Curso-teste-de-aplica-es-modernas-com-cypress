/// <reference types="cypress" />

// only() => Para executar um conjunto ou teste especificado.
// skip() => Para pular um conjunto ou teste especificado.

it("A external test...", () => {});

describe("Should group tests...", () => {
  describe("Should group more specific tests...", () => {
    it("A specific test....", () => {});
  });

  describe("Should group more specific tests 2...", () => {
    it("A specific test 2...", () => {});
  });
  it("A internal test...", () => {});
});
