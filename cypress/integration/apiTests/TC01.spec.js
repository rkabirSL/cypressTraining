describe("API Testing", () => {
  Cypress.config("baseUrl", "https://dummy.restapiexample.com/api/v1/");
  it("GET - read", () => {
    cy.request("GET", "/employees").then((response) => {
      expect(response).to.have.property("status", 200);
      expect(response.body.data).to.have.not.be.null;
      expect(response.body.data).to.have.any.keys("0");
    });
  });
  it("POST - Create", () => {
    const item = { name: "test", salary: "123", age: "23" };

    cy.request("POST", "/create", item)
      .its("body")
      .its("data")
      .should("include", { name: "test" });
  });
});

//give a shout to the dev
