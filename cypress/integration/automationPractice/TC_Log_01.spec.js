/// <reference types="cypress" />

describe("login to view their purchase history, credit slips, and edit personal details", function () {
  beforeEach(function () {
    cy.fixture("automationPrac-det").as("data");
    cy.visit("http://automationpractice.com");
    cy.get("a[title='Log in to your customer account']").click();
  });
  it("login to view purchase history, credit slips", function () {
    const { email, password } = this.data.loginCredential;
    cy.get(".page-heading").should("have.text", "Authentication");
    cy.get("#email").type(email);
    cy.get("#passwd").type(password);
    cy.get("button[id='SubmitLogin'] span").click();
    cy.get("a[title='Orders'] span").should(
      "have.text",
      "Order history and details"
    );
    cy.get("a[title='Orders'] span").click();
    cy.xpath('//a[normalize-space()="AXIQGKBKD"]').should(
      "contain",
      "AXIQGKBKD"
    );
  });
  it("login and edit personal details", function () {
    const { email, password } = this.data.loginCredential;
    cy.shoppingLogin(email, password);
    cy.get("a[title='Addresses'] span").click();
    cy.xpath("//span[normalize-space()='Johnson']").should(
      "contain",
      "Johnson"
    );
    cy.get("a[title='Update'] span").click();
    cy.get(".info-title").should("contain", "My addresswork");
    cy.get("#phone").clear();
    cy.get("#phone").type("07985366987");
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.get(".address_phone").should("contain", "07985366987");
  });
  it("add items to wish list to your account", function () {
    cy.get("a[title='Women']").click();
    cy.get(".cat-name").should("contain", "Women");
    cy.get("img[title='Faded Short Sleeve T-shirts']").click();
    cy.get("h1[itemprop='name']").should(
      "have.text",
      "Faded Short Sleeve T-shirts"
    );
    cy.get("#wishlist_button").click();
    cy.get(".fancybox-error").should(
      "have.text",
      "You must be logged in to manage your wishlist."
    );
    cy.get("a[title='Close']").click();
    cy.get("a[title='Log in to your customer account']").click();
    const { email, password } = this.data.loginCredential;
    cy.shoppingLogin(email, password);
    cy.xpath("//a[@title='Women']").click();
    cy.get("img[title='Faded Short Sleeve T-shirts']").click();
    cy.get("#wishlist_button").click();
    cy.get(".fancybox-error").should("have.text", "Added to your wishlist.");
    cy.get("a[title='Close']").click();
    cy.get("a[title='View my customer account'] span").click();
    cy.get(".page-heading").should("contain", "account");
    cy.get("a[title='My wishlists'] span").click();
    cy.xpath("//a[normalize-space()='My wishlist']").should(
      "contain",
      "My wishlist"
    );
    cy.xpath("//a[contains(text(),'My wishlist')]").click();
    cy.get("#s_title").should("contain", "Faded Short Sleeve T-shirts");
  });
  //
});
