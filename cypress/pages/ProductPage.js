class ProductPage {
  elements = {
    productName: () => cy.get('[data-testid="product-name"]'),
    productPrice: () => cy.get('[data-testid="product-price"]'),
    productDescription: () => cy.get('[data-testid="product-description"]'),
    quantityInput: () => cy.get('[data-testid="quantity-selector"]'),
    addToCartButton: () => cy.get('[data-testid="add-to-cart"]'),
    backToProductsButton: () => cy.get('[data-testid="back-to-products"]'),
    viewDetailsButton: (id) => cy.get(`[data-testid="view-product-${id}"]`),
  }

  verifyProductDetails({ name, price, description }) {
    if (name) {
      this.elements.productName().should('contain', name);
    }
    if (price) {
      this.elements.productPrice().should('contain', price);
    }
    if (description) {
      this.elements.productDescription().should('contain', description);
    }
  }

  selectQuantity(qty) {
    this.elements.quantityInput().select(`${qty}`);
  }

  clickAddToCart() {
    this.elements.addToCartButton().click();
  }

  clickBackToProducts() {
    this.elements.backToProductsButton().click();
  }

  clickViewDetailsById(id) {
    this.elements.viewDetailsButton(id).click();
  }

  verifyPage() {
    this.elements.productName().should('be.visible');
    this.elements.productPrice().should('be.visible');
    this.elements.productDescription().should('be.visible');
    this.elements.quantityInput().should('be.visible');
    this.elements.addToCartButton().should('be.visible');
    this.elements.backToProductsButton().should('be.visible');
  }
  verifyRedirectToCart() {
    cy.url().should('include', '/cart');
  }

  verifyItemInCart() {
    cy.get('[data-testid="cart-items"], [data-testid="cart-item"]').should('exist');
  }

  verifyInvalidProductPage() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="not-found"], [data-testid="error-message"]').length > 0) {
        cy.log('Not found or error message found via data-testid');
      } else if ($body.find('.not-found, h1:contains("404")').length > 0) {
        cy.log('404 page found via class or header');
      } else {
        cy.contains(/404|not found|error/i).should('exist');
      }
    });
  }

  verifyQuantityNotAllowed() {
    cy.url().should('not.include', '/cart');
    cy.get('[data-testid="quantity-error"], .input-error').should('be.visible');
  }

  verifyQuantityLimit() {
    cy.get('[data-testid="quantity-error"]')
      .should('be.visible')
      .and('contain', /limit|maximum|allowed/i);
  }

  openProduct(productName) {
    cy.contains('.product-card .product-name', productName)
      .parents('.product-card')
      .within(() => {
        cy.get('.view-details-button').click();
      });
  }

  clickButton(buttonText) {
    cy.contains('button', buttonText).click();
  }
}

export default new ProductPage();