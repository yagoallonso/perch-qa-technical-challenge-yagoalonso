Feature: Homepage Navigation

@smoke
Scenario: User can navigate to the homepage
  Given I am on the homepage
  Then I should see the main content
  And I should see the full list of products


@smoke
Scenario: Navigate to Product Page
  Given I am on the homepage
  When I click on "View Details" of the first product
  Then I should be redirected to the Product Page

Scenario: Searching products by name
  Given I am on the homepage
  When I search for a product by its name
  Then only the corresponding product should be displayed

@negative
Scenario: Search returns no results (negative)
  Given I am on the homepage
  When I search for "invalidsearchterm"
  Then I should see a "No products found" message

Scenario: Sort products ascending
  Given I am on the homepage
  When I sort the products by price ascending
  Then the products should be sorted from lowest to highest price

Scenario: Sort products descending
  Given I am on the homepage
  When I sort the products by price descending
  Then the products should be sorted from highest to lowest price

Scenario: Profile button navigation
  Given I am on the homepage
  When I click the Profile button
  Then I should be redirected to the Profile Page

Scenario: Cart button navigation
  Given I am on the homepage
  When I click the Cart button
  Then I should be redirected to the Cart Page