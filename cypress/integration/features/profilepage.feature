Feature: Profile Page
  As a user
  I want to view and manage my profile information and order history
  So that I can keep my details up to date and track my purchases

Background:
  Given I go to the Profile Page

  @smoke
  Scenario: Display personal information
    Then I should see my name and email

  Scenario: Edit personal information
    When I click the "Edit Profile" button
    Then I should be able to edit my name and email
    And I should see "Save Changes" and "Cancel" buttons

  Scenario: Save updated personal information
    Given I click the "Edit Profile" button
    When I update my name and email
    And I click "Save Changes"
    Then my updated name and email should be displayed

  Scenario: Cancel edit personal information
    Given I click the "Edit Profile" button
    When I update my name and email
    And I click "Cancel"
    Then I should see the previous name and email

  Scenario: Display order history when orders exist
    Given I have completed a successful payment
    When I click on "View Your Orders"
    Then I should see the order number, date, total amount, and items

  Scenario: No orders shows empty state
    Given I should see a message indicating that there are no orders
    And I click on the Start Shopping button
    Then I should be redirected to the Home Page


  Scenario: Back to Home navigation
    When I click the "Back to Home" button
    Then I should be redirected to the Home Page