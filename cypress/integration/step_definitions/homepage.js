import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../pages/HomePage.js';
import ProductPage from '../../pages/ProductPage.js';
import ProfilePage from '../../pages/ProfilePage.js';
import CartPage from '../../pages/CartPage.js';
import products from '../../fixtures/products.json';

Given('I am on the homepage', () => {
    HomePage.visit();
});

Then('I should see the main content', () => {
    HomePage.verifyMainContent();
});

Then('I should see the full list of products', () => {
    HomePage.verifyProductsGrid();
});

When('I click on "View Details" of the first product', () => {
    HomePage.clickFirstProductViewDetails();
});

Then('I should be redirected to the Product Page', () => {
    ProductPage.verifyPage();
});

When('I search for {string}', (searchTerm) => {
    HomePage.enterSearchTerm(searchTerm);
});

Then('the products list should be filtered accordingly', () => {
    HomePage.verifyFilteredProducts();
});

Then('I should see a "No products found" message', () => {
    HomePage.verifyNoResultsMessage();
});

When('I sort the products by price ascending', () => {
    HomePage.ensureSort('asc');
});

Then('the products should be sorted from lowest to highest price', () => {
    HomePage.verifyProductsSortedAscending();
});

When('I sort the products by price descending', () => {
    HomePage.ensureSort('desc');
});

Then('the products should be sorted from highest to lowest price', () => {
    HomePage.verifyProductsSortedDescending();
});

When('I sort products in {string} order', (order) => {
    HomePage.sortProducts(order);
});

Then('the products should be sorted in {string} order', (order) => {
    HomePage.verifySortedProducts(order);
});

When('I click the Profile button', () => {
    HomePage.clickProfileButton();
});

Then('I should be redirected to the Profile Page', () => {
    ProfilePage.verifyPage();
});

When('I click the Cart button', () => {
    HomePage.clickCartButton();
});

Then('I should be redirected to the Cart Page', () => {
    CartPage.verifyPage();
});

Then('the products list should contain all expected items', () => {
    products.products.forEach((product) => {
        cy.contains(product.name).should('be.visible');
        cy.contains(product.price.toString()).should('be.visible');
    });
});

When('I search for a product by its name', () => {
    cy.fixture('products').then(({ products }) => {
        products.forEach((p) => {
            HomePage.enterSearchTerm(p.name);
            HomePage.verifySingleResultByName(p.name);
            HomePage.clearSearch();
        });
    });
});

Then('only the corresponding product should be displayed', () => {
    HomePage.elements.searchInput().should('have.value', '');
});