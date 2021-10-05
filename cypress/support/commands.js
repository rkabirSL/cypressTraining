Cypress.Commands.add("login", (username, password) => {
  cy.get("[data-testid=username]").type(username);
  cy.get("[data-testid=password]").type(password);
  cy.get("[data-testid=submit]").click();
});

Cypress.Commands.add("shoppingLogin", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#passwd").type(password);
  cy.get("#SubmitLogin > span").click();
});
