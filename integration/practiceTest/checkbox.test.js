/// <reference types="cypress" />

describe("checkbox", () => {
  //before each runs before each test in this block
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/checkboxes");
    // assigning h3 element as the heading text, by declaring as you are using an alias
    //headingText can be named to anything
    cy.get("h3").invoke("text").as("headingText");
  });
  it("should assert the heading in checkbox correctly", function () {
    //using the alias headingText, we are checking whether the heading text has "checkboxes"
    //written in the h3 element... this.headingText can only be called in a function
    //otherwise this statement wont work especially in an arrow function
    expect(this.headingText).to.equal("Checkboxes");
  });
});
