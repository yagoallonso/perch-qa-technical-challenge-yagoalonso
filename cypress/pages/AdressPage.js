class AddressPage {
  elements = {
    firstNameInput: () => cy.get('[data-testid="firstname-input"]'),
    emailInput: () => cy.get('[data-testid="email-input"]'),
    addressInput: () => cy.get('[data-testid="street-input"]'),
    cityInput: () => cy.get('[data-testid="city-input"]'),
    stateInput: () => cy.get('[data-testid="state-input"]'),
    zipCodeInput: () => cy.get('[data-testid="zipcode-input"]'),
    phoneNumberInput: () => cy.get('[data-testid="phone-input"]'),
    countryInput: () => cy.get('[data-testid="country-input"]'),
    continueToPaymentBtn: () => cy.get('[data-testid="continue-to-payment"]'),
    backToCartBtn: () => cy.get('[data-testid="back-to-cart"]'),
    errorMessages: () => cy.get('.error-message'), // ajuste conforme app
  }

  verifyPage() {
    cy.url().should('include', '/address');
    cy.contains('h1', 'Address').should('be.visible');
  }

  fillAddressForm(user) {
    this.elements.firstNameInput().clear().type(user.firstName);
    this.elements.emailInput().clear().type(user.email);
    this.elements.addressInput().clear().type(user.address);
    this.elements.cityInput().clear().type(user.city);
    this.elements.stateInput().clear().type(user.state);
    this.elements.zipCodeInput().clear().type(user.zipCode);
    this.elements.phoneNumberInput().clear().type(user.phoneNumber);
    this.elements.countryInput().clear().type(user.country);
  }

  clickContinueToPayment() {
    this.elements.continueToPaymentBtn().click();
  }

  clickBackToCart() {
    this.elements.backToCartBtn().click();
  }

  verifyErrorMessage(fieldName) {
    this.elements.errorMessages().contains(fieldName).should('be.visible');
  }
}

export default new AddressPage();