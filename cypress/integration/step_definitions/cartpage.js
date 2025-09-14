import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

function addItemToCart() {
  cy.visit('/');
  cy.get('[data-testid^="view-product"]').first().click();
  cy.get('[data-testid="product-detail-page"]').should('be.visible');
  cy.get('[data-testid="add-to-cart"]').should('be.visible').click();
  saveCurrentCartItem();
  cy.get('[data-testid="continue-shopping"]').click();
}

function saveCurrentCartItem() {
  cy.get('.cart-items').within(() => {
    cy.get('.item-name').invoke("text").then((name) => {
      cy.get('[data-testid^="quantity-"]').invoke("val").then((qty) => {
        const itemData = { name: name.trim(), qty: parseInt(qty, 10) };
        window.sessionStorage.setItem("lastCartItem", JSON.stringify(itemData));
      });
    });
  });
}


Given("my cart is empty and I am on the Cart Page", () => {
  cy.visit("/");
  cy.get('[data-testid="nav-to-cart"]').click();
  cy.get('[data-testid="cart-item"]').should("not.exist");
});
Then("I should see that the cart is empty", () => {
  cy.get('[data-testid="empty-cart"]').should("contain.text", "Your cart is empty");
});

When("I view the cart", () => {
  
});

Then("I should see the item details in the cart", () => {
  cy.get('[data-testid="cart-item"]').should("exist").within(() => {
    cy.get('[data-testid^="item-name"]').should("not.be.empty");
    cy.get('[data-testid^="item-price"]').should("contain", "$");
    cy.get('[data-testid^="quantity-"]').invoke("val").should("not.be.empty");
  });

  cy.get('[data-testid="subtotal"]').should("contain", "$");
});

When("I change the quantity of the item to {int}", (qty) => {
  cy.get('[data-testid="quantity-2"]').select(qty.toString());
});

Then("the item's subtotal should update accordingly", () => {
  
    cy.get('[data-testid^="item-price"]').invoke("text").then((priceText) => {
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      cy.get('[data-testid^="quantity-"]').invoke("val").then((qtyVal) => {
        const qty = parseInt(qtyVal, 10);
        const expectedSubtotal = (price * qty).toFixed(2);
        // Now get the displayed subtotal
        cy.get('[data-testid="subtotal"]').invoke("text").then((subtotalText) => {
          const subtotalVal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
          expect(subtotalVal).to.eq(Number(expectedSubtotal));
        });
      });
    });
  
});
Then("the cart should still contain the previously added item", () => {
  cy.window().then((win) => {
    const savedItem = win.sessionStorage.getItem("lastCartItem");
    if (!savedItem) {
      throw new Error("No cart item stored in sessionStorage for verification");
    }
    const { name, qty } = JSON.parse(savedItem);
    cy.get('.cart-items').should("exist").within(() => {
      cy.get('.item-name').should("have.text", name);
      cy.get('[data-testid^="quantity-"]').invoke("val").should("eq", qty.toString());
    });
  });
});
When("I remove the item from the cart", () => {
    cy.get('[data-testid^="remove-"]').click();
});

Then("my cart should be empty", () => {
  cy.get('[data-testid="cart-item"]').should("not.exist");
    });
And ("I should see an empty cart message",() =>{
  cy.get('[data-testid="empty-cart"]').should("contain.text", "Your cart is empty");
});

When("I click on the Proceed to checkout button", () => {
  cy.get('[data-testid="proceed-to-checkout"]').click();
});

Then("I should be navigated to the Address Page", () => {
  cy.url().should("include", "/address");
  cy.contains(/address/i).should("exist");
});

When("I click on the Continue Shopping button", () => {
  cy.get('[data-testid="continue-shopping"]').click();
});

Then("I should be navigated to the Home Page", () => {
  cy.url().should("eq", Cypress.config().baseUrl);
  cy.contains("Product Catalog").should("be.visible");
});


Then("the item should be removed from the cart or show a validation message", () => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="empty-cart-message"]').length) {
      cy.get('[data-testid="empty-cart-message"]').should("be.visible");
    } else if ($body.find('[data-testid="cart-item"]').length === 0) {
      cy.contains(/empty cart|no items/i).should("exist");
    } else {
      cy.get('[data-testid="cart-item"]').within(() => {
        cy.contains(/invalid|minimum|must be/i).should("exist");
      });
    }
  });
});



Given("I have added items to my cart", () => {
  addItemToCart();
  cy.get('[data-testid="continue-shopping"]').click();
});

Given("I have an item in my cart", () => {
  addItemToCart();
  cy.get('[data-testid="nav-to-cart"]').click();
});
Given("I have at least one item in my cart", () => {
  addItemToCart();
});

When("I navigate to the Cart Page", () => {
  cy.get('[data-testid="nav-to-cart"]').click();
});

Then("I should see the item listed in my cart", () => {
  cy.get('.cart-items').should('exist');
});

Then("I should see the item's name, price, quantity, and subtotal", () => {
      cy.get('[data-testid^="item-name"]').should("not.be.empty");
      cy.get('[data-testid^="item-price"]').should("contain", "$");
      cy.get('[data-testid^="quantity-"]').invoke("val").should("not.be.empty");
      cy.get('[data-testid="subtotal"]').should("contain", "$");
    });
