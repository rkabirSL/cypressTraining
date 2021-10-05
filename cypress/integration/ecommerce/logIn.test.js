/// <reference types="cypress" />

describe("login to the site using your credentials", function () {
  beforeEach(function () {
    cy.visit("http://automationpractice.com/index.php");
    cy.fixture("login-details").as("data");
  });

  it("login using the credential from the json file", function () {
    const { email, password } = this.data.loginCredentials;
    cy.get(".login").click();
    cy.get("#email").type(email);
    cy.get("#passwd").type(password);
    cy.get("#SubmitLogin > span").click();
  });
});
