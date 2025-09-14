const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

Given('I go to the Profile Page', () => {
  cy.visit('/');
  cy.get('[data-testid="nav-to-profile"]').click();
});

Then('I should see my name and email', () => {
  cy.get('.profile-info').should('be.visible');
  cy.get('.profile-info').within(() => {
    cy.get('p').first().invoke('text').should('not.be.empty');
    cy.get('p').eq(1).invoke('text').should('not.be.empty');
  });
});

When('I click the "Edit Profile" button', () => {
  cy.get('[data-testid="edit-profile"]').click();
});

Then('I should see "Save Changes" and "Cancel" buttons', () => {
  cy.get('button').contains('Save Changes').should('be.visible');
  cy.get('button').contains('Cancel').should('be.visible');
  cy.get('input[name="name"]').should('be.visible');
  cy.get('input[name="email"]').should('be.visible');
});

Then('I should be able to edit my name and email', () => {
  cy.get('[data-testid="profile-name-input"]').should('be.enabled');
  cy.get('[data-testid="profile-email-input"]').should('be.enabled');
});

When('I update my name and email', () => {
  cy.get('input[name="name"]').invoke('val').as('originalName');
  cy.get('input[name="email"]').invoke('val').as('originalEmail');
  cy.fixture('users.json').then((users) => {
    const user = users[1];
    cy.get('input[name="name"]').clear().type(user.firstname);
    cy.get('input[name="email"]').clear().type(user.email);
  });
});
When('I click "Save Changes"', () => {
  cy.get('[data-testid="save-profile"]').click();
});
When('I click "Cancel"', () => {
  cy.get('[data-testid="cancel-edit"]').click();
});

Then('my updated name and email should be displayed', () => {
  cy.fixture('users.json').then((users) => {
    const user = users[1]; 
    cy.get('.profile-info').should('contain.text', user.firstname);
    cy.get('.profile-info').should('contain.text', user.email);
    cy.get('button').contains('Edit Profile').should('be.visible');
  });
});

Then('I should see the previous name and email', function () {
  cy.get('.profile-info').should('contain.text', this.originalName);
  cy.get('.profile-info').should('contain.text', this.originalEmail);
});

Given('the user has existing orders', () => {
  cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
  cy.visit('/profile');
  cy.wait('@getOrders');
});

Then('the order history is displayed', () => {
  cy.get('.order-history').should('be.visible');
  cy.get('.order-item').its('length').should('be.gte', 1);
});

Given('the user has no orders', () => {
  cy.intercept('GET', '/api/orders', { body: [] }).as('getOrdersEmpty');
  cy.visit('/profile');
  cy.wait('@getOrdersEmpty');
});

Then('an empty order history state is shown', () => {
  cy.get('.order-history').should('be.visible');
  cy.get('.order-item').should('not.exist');
  cy.get('.order-history').should('contain.text', 'No orders found');
});

Then('I should see a message indicating that there are no orders', () => {
  cy.get('[data-testid="no-orders"]').should('be.visible').and('contain.text', "You haven't placed any orders yet");
  cy.get('[data-testid="start-shopping"]').should('be.visible');
});

When('I click on the Start Shopping button', () => {
  cy.get('[data-testid="start-shopping"]').click();
});

Then('I should be redirected to the Home Page', () => {
  cy.url().should('include', '/');
});

When('the user clicks the Back to Home button', () => {
  cy.get('button').contains('Back to Home').click();
});

Then('the user is navigated to the Home page', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});
Given('I have completed a successful payment', () => {
  cy.visit('/');
  cy.get('[data-testid^="view-product"]').first().click();
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="proceed-to-checkout"]').click();

  cy.fixture('users').then((users) => {
    const user = users[0];
    cy.get('[data-testid="firstname-input"]').type(user.firstname);
    cy.get('[data-testid="email-input"]').type(user.email);
    cy.get('[data-testid="phone-input"]').type(user.phone);
    cy.get('[data-testid="street-input"]').type(user.street);
    cy.get('[data-testid="city-input"]').type(user.city);
    cy.get('[data-testid="state-input"]').type(user.state);
    cy.get('[data-testid="zipcode-input"]').type(user.zipcode);
    cy.get('[data-testid="country-input"]').type(user.country);
  });
  cy.get('[data-testid="continue-to-payment"]').click();

  cy.fixture('cards').then((cards) => {
    const card = cards.valid;
    cy.get('[data-testid="cardholder-input"]').type(card.holder);
    cy.get('[data-testid="card-number-input"]').type(card.number);
    cy.get('[data-testid="expiry-input"]').type(card.expiry);
    cy.get('[data-testid="cvv-input"]').type(card.cvv);
  });
  cy.get('[data-testid="complete-payment"]').click();

  cy.get('.success-content')
    .should('be.visible')
    .and('contain.text', 'Thank You for Your Purchase');
});



Then('I should see the order number, date, total amount, and items', () => {
  cy.get('.orders-card').should('be.visible');
  cy.get('.orders-card').within(() => {
    cy.contains('Order #').should('exist');
    cy.contains('Date:').should('exist');
    cy.contains('Total:').should('exist');
    cy.get('.order-items').first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('.item-name').should('not.be.empty');
      cy.get('.product-quantity').should('contain.text', 'Quantity');
      cy.get('.product-price').should('contain.text', '$');
    });
  });
});