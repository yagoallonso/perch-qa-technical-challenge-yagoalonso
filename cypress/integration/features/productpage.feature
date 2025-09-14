Feature: Product Page

  Background:
    Given I am on the product page for a valid product

  @smoke
  Scenario: Product details are displayed
    Then I should see the product title
    And I should see the product description
    And I should see the product price

  Scenario: Add one item to the cart
    When I set the quantity to 1
    And I click the "Add to Cart" button
    Then the cart should show 1 item

  Scenario: Add multiple items to the cart
    When I set the quantity to 3
    And I click the "Add to Cart" button
    Then the cart should show 3 items

  Scenario: Back to products navigation
    When I click the "Back to Products" button
    Then I should be on the products listing page

  Scenario: Default quantity selector value is 1
    Then the quantity selector should have a default value of 1

  Scenario: Product image is displayed
    Then I should see the product image on the product page