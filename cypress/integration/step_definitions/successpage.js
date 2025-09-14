 import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
 
 When('I click on "View Your Orders"', () => {
   cy.get('[data-testid="view-orders"]').click();
 });
 Then('I should be redirected to the Profile Page', () => {
   cy.url().should('include', '/profile');
 });
When('I click on "Continue Shopping"', () => {
  cy.get('[data-testid="continue-shopping"]').click();
});

Then('I should see a confirmation of successful payment', () => {
  cy.get('.success-content').should('contain', 'Thank You for Your Purchase');
});

Then('I should see the success message {string}', (message) => {
  cy.get('.success-content').should('contain', message);
});

Then('I should see the "View Your Orders" button', () => {
  cy.get('[data-testid="view-orders"]').should('be.visible');
});

Then('I should see the "Continue Shopping" button', () => {
  cy.get('[data-testid="continue-shopping"]').should('be.visible');
});

Then('I should be redirected to the Home Page', () => {
  cy.url().should('match', /\/$/);
});