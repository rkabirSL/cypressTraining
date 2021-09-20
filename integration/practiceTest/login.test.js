/// <reference types="cypress" />
///non refactored versiob

/**
 * before each test cast visit the following site
 */
describe("login feature", () => {
  beforeEach(function () {
    cy.visit("https://automationintesting.online/#/admin");
  });
  /**
   * after entering the appropriate password from the json files it should have frontPageLink element once you loged in
   */
  it("TEST 1:  should login to the site if the credentials are valid", () => {
    cy.fixture("login-details").then((data) => {
      const { username, password } = data.validCredentials;
      cy.get("[data-testid=username]").type(username);
      cy.get("[data-testid=password]").type(password);
      cy.get("[data-testid=submit]").click();
      cy.get("#frontPageLink").should("be.visible");
    });
  });
  /**
   * enter the invalid credentials
   */
  it("TEST 2: Should not login if invalid Credentials are used  ", () => {
    cy.fixture("login-details").then((data) => {
      const { username, password } = data.invalidCredentials;
      cy.get("[data-testid=username]").type(username);
      cy.get("[data-testid=password]").type(password);
    });
    cy.get("[data-testid=submit]").click();
  });
  // after the last test case check whether the frontPageLink link exists in the page
  after(function () {
    cy.get("#frontPageLink").should("not.exist");
  });
});
