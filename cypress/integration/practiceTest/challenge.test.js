/// <reference types="cypress" />

describe("submit an enquiry", () => {
  //before each test case, the fixtures gather data from the json file and as assign to the respective alias names
  beforeEach(function () {
    cy.fixture("challenge").as("data");
    cy.fixture("login-details").as("loginCredentials");
  });
  //before the first function visit the following sites
  before(function () {
    cy.visit("https://automationintesting.online/");
  });
  //on the first test case acquire the data from json file in challange and enter it to the text fields
  it("submit an enquiry", function () {
    const { name, email, phone, subject, message } = this.data.enquiryOne;
    cy.get("#name").type(name);
    cy.get("#email").type(email);
    cy.get("#phone").type(phone);
    cy.get("#subject").type(subject);
    cy.get("#description").type(message);
    cy.get("#submitContact").click();
  });
  //in test case 2 login with the appropriate credential gathered from the json file and input it into the respective fields
  it("log in and check if your data is there", function () {
    cy.visit("https://automationintesting.online/#/admin");
    const { username, password } = this.loginCredentials.validCredentials;
    cy.login(username, password);
    cy.get(".notification").click();
  });
  //after the last test case check the following element is inside the page
  after("check if data exist in the admin login", () => {
    cy.contains("Elliot");
  });
});
