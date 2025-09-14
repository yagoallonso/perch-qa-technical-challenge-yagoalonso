import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import ProductPage from '../../pages/ProductPage';
import HomePage from '../../pages/HomePage';

Given('I am on the product page for a valid product', () => {
  cy.visit('/');
  HomePage.clickFirstProductViewDetails();
  ProductPage.verifyPage();
});

When('I set the quantity to {int}', (qty) => {
  ProductPage.selectQuantity(qty);
});

When('I click the {string} button', (buttonText) => {
  if (buttonText === 'Add to Cart') {
    cy.get('[data-testid="product-price"]')
      .should('be.visible')
      .invoke('text')
      .as('capturedProductPrice');

    ProductPage.clickButton(buttonText);
    cy.window().should((win) => {
      const cart = JSON.parse(win.localStorage.getItem('cart') || '[]');
      expect(cart.length).to.be.greaterThan(0);
    });

    return;
  }
  ProductPage.clickButton(buttonText);
});
Then('I should see the product title', () => {
  cy.get('[data-testid="product-name"]').should('be.visible');
});

Then('I should see the product description', () => {
  cy.get('[data-testid="product-description"]').should('be.visible');
});

Then('I should see the product price', () => {
  cy.get('[data-testid="product-price"]').should('be.visible');
});

Then('the cart should show {int} item(s)', (qty) => {
  cy.get('@capturedProductPrice').then((priceText) => {
    const numericPrice = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
    const expectedSubtotal = `$${(numericPrice * qty).toFixed(2)}`;
    cy.get('.quantity-controls').should('contain.text', `${qty}`);
    cy.get('[data-testid="subtotal"]').should('contain.text', expectedSubtotal);
  });
});


Then('I should be on the products listing page', () => {
  cy.url().should('include', '/');
  cy.get('[data-testid="home-page"]').should('be.visible');
});


Then('the quantity selector should have a default value of 1', () => {
  cy.get('[data-testid="quantity-selector"]').should('have.value', '1');
});

Then('I should see the product image', () => {
  cy.get('[data-testid="product-image"]').should('be.visible');
});

Then('the cart should show {int} item', (qty) => {
  cy.get('@capturedProductPrice').then((priceText) => {
    const numericPrice = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
    const expectedSubtotal = `$${(numericPrice * qty).toFixed(2)}`;
    cy.get('.quantity-controls').should('contain.text', `${qty}`);
    cy.get('[data-testid="subtotal"]').should('contain.text', expectedSubtotal);
  });
});

Then('the cart should show {int} items', (qty) => {
  cy.get('@capturedProductPrice').then((priceText) => {
    const numericPrice = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
    const expectedSubtotal = `$${(numericPrice * qty).toFixed(2)}`;
    cy.get('.quantity-controls').should('contain.text', `${qty}`);
    cy.get('[data-testid="subtotal"]').should('contain.text', expectedSubtotal);
  });
});

Then('I should see the product image on the product page', () => {
  cy.get('[data-testid="product-image"]').should('be.visible');
});