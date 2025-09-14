import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
const sel = {
  page: '[data-testid="address-page"]',
  form: '[data-testid="address-form"]',
  firstName: '[data-testid="firstname-input"]',
  email: '[data-testid="email-input"]',
  phone: '[data-testid="phone-input"]',
  street: '[data-testid="street-input"]',
  city: '[data-testid="city-input"]',
  state: '[data-testid="state-input"]',
  zip: '[data-testid="zipcode-input"]',
  country: '[data-testid="country-input"]',
  continue: '[data-testid="continue-to-payment"]',
  backToCart: '[data-testid="back-to-cart"]',
};

const fillAllRequired = (user) => {
  cy.get(sel.firstName).clear().type(user.firstname);
  cy.get(sel.email).clear().type(user.email);
  cy.get(sel.phone).clear().type(user.phone);
  cy.get(sel.street).clear().type(user.street);
  cy.get(sel.city).clear().type(user.city);
  cy.get(sel.state).clear().type(user.state);
  cy.get(sel.zip).clear().type(user.zipcode);
  cy.get(sel.country).clear().type(user.country);
};

const expectInvalid = (selector) => {
  cy.get(selector).then(($el) => {
    const el = $el.get(0);
    expect(el.checkValidity(), `${selector} should be invalid`).to.be.false;
  });
};

Given('I am on the Address page', () => {
  cy.visit('/');
  cy.get('[data-testid^="view-product"]').first().click();
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="proceed-to-checkout"]').click();
  cy.get(sel.page).should('be.visible');
});

When('I leave all required fields empty', () => {
  cy.get(sel.form).find('input').each(($i) => cy.wrap($i).clear());
});

When('I proceed by clicking the \'Continue to Payment\' button', () => {
  cy.get(sel.continue).click();
});

Then('I should see error messages for each of these fields', () => {
  cy.contains('Name must be 2-30 characters and contain only letters');
  cy.contains('Please enter a valid email address');
  cy.contains('Phone number must be 10-15 digits');
  cy.contains('City must contain only letters and spaces');
  cy.contains('State must contain only letters and spaces');
  cy.contains('ZIP code must be 4 or 5 digits');
  cy.contains('Country must contain only letters and spaces');
});

When('I provide my personal and address information correctly', () => {
  cy.fixture('users').then((users) => {
    const user = users[Math.floor(Math.random() * users.length)];
    fillAllRequired(user);
  });
});

Then('I should be navigated to the Payment page', () => {
  cy.url().should('include', '/payment');
});

When('I enter invalid values for First Name, Email, ZIP Code, and Phone Number', () => {
  cy.fixture('users_invalid').then((users) => {
    const user = users[Math.floor(Math.random() * users.length)];
    fillAllRequired(user);
  });
});

Then('I receive guidance to correct the First Name, Email, ZIP Code, and Phone Number', () => {
  cy.contains('Name must be 2-30 characters and contain only letters');
  cy.contains('Please enter a valid email address');
  cy.contains('ZIP code must be 4 or 5 digits');
  cy.contains('Please enter a valid phone number');
});

Then('the previously entered data should still be visible', () => {
  cy.fixture('users').then((users) => {
    const user = users[0];
    cy.get(sel.firstName).should('have.value', user.firstname);
    cy.get(sel.email).should('have.value', user.email);
    cy.get(sel.phone).should('have.value', user.phone);
    cy.get(sel.street).should('have.value', user.street);
    cy.get(sel.city).should('have.value', user.city);
    cy.get(sel.state).should('have.value', user.state);
    cy.get(sel.zip).should('have.value', user.zipcode);
    cy.get(sel.country).should('have.value', user.country);
  });
});

When('I enter invalid values for Email and ZIP Code', () => {
  cy.fixture('users')
    .then((users) => {
      const validUser = users[0];
      fillAllRequired(validUser);
      return cy.fixture('users_invalid');
    })
    .then((invalidUsers) => {
      const invalidUser = invalidUsers[0];
      cy.get(sel.email).clear().type(invalidUser.email);
      cy.get(sel.zip).clear().type(invalidUser.zipcode);
    });
});

Then('I should see error messages for Email and ZIP Code', () => {
  cy.contains('Please enter a valid email address');
  cy.contains('ZIP code must be 4 or 5 digits');
});

When('I correct the values for Email and ZIP Code', () => {
  cy.fixture('users').then((users) => {
    const user = users[0];
    cy.get(sel.email).clear().type(user.email);
    cy.get(sel.zip).clear().type(user.zipcode);
  });
});

Then('the error messages for Email and ZIP Code should no longer be visible', () => {
  cy.get(sel.email).then(($el) => expect($el[0].checkValidity()).to.be.true);
  cy.get(sel.zip).then(($el) => expect($el[0].checkValidity()).to.be.true);
});

When('I return to the cart', () => {
  cy.get(sel.backToCart).click();
});

And('then go back to the Address page', () => {
  cy.get('[data-testid="proceed-to-checkout"]').click();
});

Then('the previously entered data should still be visible', () => {
  cy.fixture('users').then((users) => {
    const user = users[0];
    cy.get(sel.firstName).should('have.value', user.firstname);
    cy.get(sel.email).should('have.value', user.email);
  });
});
