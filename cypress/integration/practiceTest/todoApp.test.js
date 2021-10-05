/// <reference types="cypress" />

describe("Todo Application", () => {
  it("should add a new todo item", () => {
    cy.visit("https://todomvc.com/examples/react/#/");
    cy.get(".new-todo").type("new todo action {enter}");
    cy.get(".todo-list li")
      .should("have.length", 1)
      .and("have.text", "new todo action");
  });
});
