/// <reference types="cypress" />

describe("buy a product and check the quantity inside the cart", () => {
  before(function () {
    cy.visit("http://automationpractice.com/index.php");
  });
  it("click on a category and add multiple items to the cart", () => {
    cy.get(
      '.sf-menu > :nth-child(1) > [href="http://automationpractice.com/index.php?id_category=3&controller=category"]'
    ).click();
    //add the first item to the cart
    cy.get(
      ":nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span"
    ).click();
    //continue shopping
    cy.wait(5000);
    cy.get(".continue > span").click();
    //add the second item to the cart
    cy.get(
      ":nth-child(5) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span"
    ).click();
    //continue shopping
    cy.wait(5000);
    cy.get(".continue > span").click();
    //change the category to women dresses
    cy.get(":nth-child(2) > .subcategory-image > .img > .replace-2x").click();
    //check the quantity inside the cart
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should(
      "have.text",
      "2"
    );
    //proceed to creating a new account with the existing order
    cy.get('[title="View my shopping cart"]').click();
  });
  after("sign up to the site and checkout from the cart", function () {
    //checking if the product are in the cart
    cy.get("#product_5_19_0_0 > .cart_description > .product-name > a").should(
      "have.text",
      "Printed Summer Dress"
    );
    cy.get(".cart_navigation > .button > span").click();

    cy.fixture("login-details").then((login) => {
      const {
        email,
        fName,
        lName,
        password,
        company,
        address,
        city,
        postcode,
        phone,
        alias,
      } = login.shoppingDetails;
      cy.get("#email_create").type(email);

      cy.get("#SubmitCreate > span").click();
      cy.wait(10000);
      cy.get(":nth-child(3) > .top").click();
      cy.get("#customer_firstname").type(fName);
      cy.get("#customer_lastname").type(lName);
      cy.get("#passwd").type(password);
      cy.get("#days").select("21");
      cy.get("#months").select("August");
      cy.get("#years").select("1959");
      cy.get("#company").type(company);
      cy.get("#address1").type(address);
      cy.get("#city").type(city);
      cy.get("#id_state").select("Idaho");
      cy.get("#postcode").type(postcode);
      cy.get("#phone").type(phone);
      cy.get("#alias").type(alias);
      cy.get("#submitAccount > span").click();

      //      cy.get("#id_state").type("Idaho");
    });
    cy.get("#processAddress").click();
    cy.get("#cgv").click();
    cy.get("#processCarrier").click();
    cy.get("#cheque").click();
  });
});
