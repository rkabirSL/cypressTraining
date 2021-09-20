/// <reference types="cypress" />

//before each test case visit the following site and aquire data from the fixture "login-details"
describe("login feature", () => {
  beforeEach(function () {
    cy.visit("https://automationintesting.online/#/admin");
    cy.fixture("login-details").as("data");
  });

  //calling this test 1 as function rather than arrow so that it can access global variabl data
  //then its using the custom login function that was created in support commands
  it("TEST 1:  should login to the site if the credentials are valid", function () {
    const { username, password } = this.data.validCredentials;
    cy.login(username, password);
    cy.get("#frontPageLink").should("be.visible");
    cy.contains("Front Page");
  });
  // Test 2 tests inputs wrong credentials
  it("TEST 2: Should not login if invalid Credentials are used  ", function () {
    cy.fixture("login-details").then((data) => {
      const { username, password } = this.data.invalidCredentials;
      cy.login(username, password);
    });
  });
  // if wrong credentials are used in last test case then frontPageLink should not exist in the page. COMMENT: be.not.vissible does not work in the latest cypress.
  after(function () {
    cy.get("#frontPageLink").should("not.exist");
  });
});
