Feature: Address Page
  As a user
  I want to enter my address details correctly
  So that I can proceed to payment

  Background:
    Given I am on the Address page

  Scenario: Valid data allows progression to Payment page
    When I provide my personal and address information correctly
    And I click the "Continue to Payment" button
    Then I should be navigated to the Payment page

  Scenario: Multiple invalid inputs trigger corresponding error messages
    When I enter invalid values for First Name, Email, ZIP Code, and Phone Number
    And I click the "Continue to Payment" button
    Then I should see error messages for each of these fields

  Scenario: Error messages disappear when fields are corrected
    When I enter invalid values for Email and ZIP Code
    And I click the "Continue to Payment" button
    Then I should see error messages for Email and ZIP Code
    When I correct the values for Email and ZIP Code
    Then the error messages for Email and ZIP Code should no longer be visible

  @pending @skip
  Scenario: Entered address persists when navigating back and forth
    When I provide my personal and address information correctly
    And I return to the cart
    And then go back to the Address page
    Then the previously entered data should still be visible
