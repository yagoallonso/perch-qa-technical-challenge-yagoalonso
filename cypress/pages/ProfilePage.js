class ProfilePage {
  constructor() {
    this.profileInfoSection = '.profile-info';
    this.orderHistorySection = '.order-history';
    this.orderDetailSection = '.order-detail';
    this.backToHomeButton = '.back-to-home';
  }

  verifyProfileInfo() {
    cy.get(this.profileInfoSection).should('be.visible');
  }

  verifyOrderHistorySection() {
    cy.contains('Order History').should('be.visible');
  }

  viewFirstOrderDetails() {
    cy.get(this.orderHistorySection).find('li').first().click();
    cy.get(this.orderDetailSection).should('be.visible');
  }

  clickBackToHome() {
    cy.get(this.backToHomeButton).click();
  }

  verifyPage() {
    this.verifyProfileInfo();
    this.verifyOrderHistorySection();
  }
}

export default new ProfilePage();