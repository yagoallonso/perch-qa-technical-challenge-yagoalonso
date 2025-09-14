class HomePage {
  elements = {
    mainContent: () => cy.get('[data-testid="home-page"]'),
    productsGrid: () => cy.get('.products-grid'),
    productCards: () => cy.get('[data-testid^="product-"]'),
    productName: () => cy.get('.products-grid .product-card .product-name'),
    firstProductViewDetails: () => cy.get('[data-testid^="view-product-"]').first(),
    searchInput: () => cy.get('[data-testid="product-search"]'),
    noProductsMessage: () => cy.contains('No products found matching your search'),
    sortButton: () => cy.get('[data-testid="sort-price"]'),
    profileButton: () => cy.get('[data-testid="nav-to-profile"]'),
    cartButton: () => cy.get('[data-testid="nav-to-cart"]'),
  };

  visit() {
    cy.visit('/');
  }
  verifyMainContent() {
    this.elements.mainContent().should('be.visible');
  }

  verifyProductsGrid() {
    this.elements.productsGrid().should('be.visible');
  }

  clickFirstProductViewDetails() {
    this.elements.firstProductViewDetails().click();
  }

  enterSearchTerm(term) {
    this.elements.searchInput().clear().type(term);
  }

  clearSearch() {
    this.elements.searchInput().clear();
  }

  verifyFilteredProducts() {
    this.elements.productCards().should('exist');
  }

  verifyNoProductsFound() {
    this.elements.noProductsMessage().should('be.visible');
  }

  verifySingleResultByName(name) {
    cy.get('.products-grid .product-card').should('have.length', 1);
    cy.get('.products-grid .product-card .product-name')
      .should('be.visible')
      .and('contain.text', name);
  }

  ensureSort(direction = 'asc') {

    this.elements
      .sortButton()
      .invoke('attr', 'aria-label')
      .then((label = '') => {
        const l = label.toLowerCase();
        const isAsc = l.includes('ascending');
        const isDesc = l.includes('descending');
        if (direction === 'asc' && isDesc) {
          this.elements.sortButton().click();
        } else if (direction === 'desc' && isAsc) {
          this.elements.sortButton().click();
        }
      });
  }

  verifyProductsSortedAscending() {
    this._getPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices, 'prices ascending').to.deep.equal(sorted);
    });
  }

  verifyProductsSortedDescending() {
    this._getPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices, 'prices descending').to.deep.equal(sorted);
    });
  }

  _getPrices() {
    return cy
      .get('.products-grid [data-testid^="product-"] .product-price')
      .then(($els) => {
        const numbers = [...$els].map((el) =>
          parseFloat(el.textContent.replace(/[^0-9.]/g, ''))
        );
        return numbers;
      });
  }

  clickProfileButton() {
    this.elements.profileButton().click();
  }

  clickCartButton() {
    this.elements.cartButton().click();
  }

  verifyRedirectedToProfile() {
    cy.url().should('include', '/profile');
  }

  verifyRedirectedToCart() {
    cy.url().should('include', '/cart');
  }

  verifyNoResultsMessage() {
    this.elements.noProductsMessage().should('be.visible');
  }
}

export default new HomePage();