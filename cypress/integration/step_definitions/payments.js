import { Given, When, Then,And } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the Payment page', () => {
  cy.visit('/'); 
  cy.get('[data-testid^="view-product"]').first().click(); 
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="proceed-to-checkout"]').click(); 
  cy.fixture('users.json').then((users) => {
    const user = users[0];
    cy.get('[data-testid="firstname-input"]').type(user.firstname);
    cy.get('[data-testid="email-input"]').type(user.email);
    cy.get('[data-testid="phone-input"]').type(user.phone);
    cy.get('[data-testid="street-input"]').type(user.street);
    cy.get('[data-testid="city-input"]').type(user.city);
    cy.get('[data-testid="state-input"]').type(user.state);
    cy.get('[data-testid="zipcode-input"]').type(user.zipcode);
    cy.get('[data-testid="country-input"]').type(user.country);
    cy.get('[data-testid="continue-to-payment"]').click();
  });

  cy.url().should('include', '/payment');
});

When('I provide valid card details', () => {
  cy.fixture('cards.json').then((data) => {
    const valid = data.valid;
    cy.get('[data-testid="cardholder-input"]').clear().type(valid.holder);
    cy.get('[data-testid="card-number-input"]').clear().type(valid.number);
    cy.get('[data-testid="expiry-input"]').clear().type(valid.expiry);
    cy.get('[data-testid="cvv-input"]').clear().type(valid.cvv);
  });
});

And("I click the Place Order button", () => {
  cy.get('[data-testid="complete-payment"]').click();
});

Then('I should see a confirmation of successful payment', () => {
  cy.get('.success-content')
    .should('be.visible')
    .and('contain.text', 'Thank You for Your Purchase');
});

When('I attempt payment with invalid card details', () => {
  cy.fixture('cards.json').then((data) => {
    data.invalid.forEach((invalidCase) => {
      cy.get('[data-testid="cardholder-input"]').clear().type(invalidCase.number);
      cy.get('[data-testid="card-number-input"]').clear().type(invalidCase.expiry);
      cy.get('[data-testid="expiry-input"]').clear().type(invalidCase.cvv);
     cy.get('[data-testid="cvv-input"]').click();
    });
  });
});

Then('I should see the correct validation error messages', () => {
});
Then('I should see the Alert Message', () => {
   cy.get('[data-testid="cardholder-input"]') 
    .then(($input) => {
      const validationMessage = $input[0].validationMessage;
      expect(validationMessage).to.eq('Please fill out this field.');
      });
});
When('I navigate back to the Address Page', () => {
  cy.get('button[data-testid="back-to-address"]').click();
});

Then('I should be on the Address Page', () => {
  cy.url().should('include', '/address');
  cy.contains('Address').should('be.visible');
});
