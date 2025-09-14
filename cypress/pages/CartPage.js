class CartPage {
  elements = {
    cartItemRows: () => cy.get('.cart_item'), // update selector as needed
    quantityInput: () => cy.get('.cart_quantity_input'), // update selector as needed
    removeButton: () => cy.get('.cart_remove'), // update selector as needed
    cartTotal: () => cy.get('.cart_total'), // update selector as needed
    proceedToCheckoutBtn: () => cy.get('.proceed_to_checkout'), // update selector as needed
    continueShoppingBtn: () => cy.get('.continue_shopping'), // update selector as needed
  }

  verifyPage() {
    cy.url().should('include', '/cart');
    cy.contains('h1', 'Shopping Cart').should('be.visible');
  }

  verifyCartPage() {
    cy.url().should('include', '/cart')
    this.elements.cartItemRows().should('exist')
    this.elements.cartTotal().should('exist')
    this.elements.proceedToCheckoutBtn().should('exist')
    this.elements.continueShoppingBtn().should('exist')
  }

  updateQuantity(qty) {
    this.elements.quantityInput().first().clear().type(`${qty}{enter}`)
  }

  removeFirstItem() {
    this.elements.removeButton().first().click()
  }

  verifyCartTotal(expectedTotal) {
    this.elements.cartTotal().should('contain', expectedTotal)
  }

  clickProceedToCheckout() {
    this.elements.proceedToCheckoutBtn().click()
  }

  clickContinueShopping() {
    this.elements.continueShoppingBtn().click()
  }

  verifySubtotalForQuantity(qty) {
    this.elements.cartItemRows().first().within(() => {
      cy.get('.product-price').invoke('text').then((priceText) => {
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const expectedTotal = (price * qty).toFixed(2);
        this.elements.cartTotal().should('contain.text', expectedTotal);
      });
    });
  }

  verifyItemCount(qty) {
    this.elements.cartItemRows().should('have.length', qty);
  }

  openCart() {
    cy.get('[data-testid="nav-to-cart"]').click();
    cy.url().should('include', '/cart');
    cy.contains('h1', 'Shopping Cart').should('be.visible');
  }

  goToAddressPage() {
    this.elements.proceedToCheckoutBtn().click();
    cy.url().should('include', '/address');
  }
}

export default new CartPage();