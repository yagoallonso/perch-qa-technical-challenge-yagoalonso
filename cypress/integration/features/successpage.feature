Feature: Success Page
  As a user
  I want to see a confirmation after placing an order
  So that I know my order went through and I can navigate easily

  Background:
    Given I have completed a successful payment
    Then I should see a confirmation of successful payment

  @smoke
  Scenario: Redirect to View Your Orders
    When I click on "View Your Orders"
    Then I should be redirected to the Profile Page
  
  Scenario: Redirect to Continue Shopping
    When I click on "Continue Shopping"
    Then I should be redirected to the Home Page

  Scenario: Success message is displayed correctly
    Then I should see the success message "Thank You for Your Purchase"

  Scenario: Success page displays helpful navigation options
    Then I should see the "View Your Orders" button
    And I should see the "Continue Shopping" button