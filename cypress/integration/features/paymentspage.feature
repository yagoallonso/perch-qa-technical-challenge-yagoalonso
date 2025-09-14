Feature: Payment Page
  As a user
  I want to make a payment with my card
  So that I can complete my purchase

Background:
  Given I am on the Payment page

  @smoke
  Scenario: Successful payment with valid data
    When I provide valid card details
    And I click the Place Order button
    Then I should see a confirmation of successful payment

  @negative
  Scenario: Invalid payment details show appropriate error messages
    When I attempt payment with invalid card details
    Then I should see the correct validation error messages
  
  @negative
  Scenario: Click on Place Order with empty fields
    When I click the Place Order button
    Then I should see the Alert Message
   

  Scenario: Back to Address navigation works
    When I click the "Back to Address" button
    Then I should be navigated to the Address Page
  
  