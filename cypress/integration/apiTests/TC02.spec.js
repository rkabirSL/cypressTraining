describe("Deep data testing", () => {
  Cypress.config("baseUrl", "http://httpbin.org");
  it("GET - read data ", () => {
    cy.request("GET", "/get").then((response) => {
      expect(response.body.origin).to.include("86.148.172.217");
    });
  });
});
