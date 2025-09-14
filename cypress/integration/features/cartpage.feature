Feature: Cart Page
  As a user
  I want to manage my cart
  So that I can review and update my purchases before checkout

  Background:
    Given I have at least one item in my cart
    And   I navigate to the Cart Page

  @smoke
  Scenario: Display items in the cart
    Then I should see the item listed in my cart
    And I should see the item's name, price, quantity, and subtotal

  Scenario: Update item quantity updates Subtotal
    And  I change the quantity of the item to 2
    Then the item's subtotal should update accordingly

  Scenario: Remove item empties the cart
    When I remove the item from the cart
    Then my cart should be empty
    And I should see an empty cart message

  Scenario: Proceed to checkout goes to Address Page
    When I click on the Proceed to checkout button
    Then I should be navigated to the Address Page

  Scenario: Continue shopping returns to Home Page
    When I click on the Continue Shopping button
    Then I should be navigated to the Home Page

  Scenario: Cart retains items after navigating back
    When I click on the Continue Shopping button
    And I navigate to the Cart Page
    Then the cart should still contain the previously added item

  Scenario: Open the cart with no items
    Given my cart is empty and I am on the Cart Page
    Then my cart should be empty
    And I should see an empty cart message