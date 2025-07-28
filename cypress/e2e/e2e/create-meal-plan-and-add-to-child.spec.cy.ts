import {
  checkMealOptionDoesNotExistAndSelectValid,
  selectMealOption,
  selectMenu,
} from '../helpers';

describe('Create meal plan and add to child', () => {
  it('Create a meal plan and add meals to child for week, excluding any allergen options', () => {
    cy.intercept('GET', '*/mealplan').as('mealplanRequest');
    cy.intercept('POST', '*/mealplan').as('mealplanAddRequest');
    cy.intercept('GET', '*/child').as('childRequest');
    cy.intercept('GET', '*/child/*').as('childRequest');
    cy.intercept('GET', '*/child/*/nutrition').as('nutritionRequest');
    cy.intercept('POST', '*/child/*/meal').as('addMealRequest');
    cy.intercept('PUT', '*/child/*/meal').as('editMealRequest');

    // navigate to app
    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    navigateToMealPlans();
    cy.wait('@mealplanRequest');

    addMealPlan();
    cy.wait('@mealplanAddRequest');

    navigateToChildren();
    cy.wait('@childRequest');
    cy.wait('@nutritionRequest');

    addMealsToChild();
    cy.wait('@addMealRequest');

    editChildMeal();

    deleteMealPlan();
  });
});

const addMealPlan = () => {
  cy.get('button').contains('Add Meal Plan').click();
  cy.get('div.dialog-container').should('exist');
  cy.get('mat-form-field').contains('Name').click().type('Test Meal Plan');
  cy.get('input.date').click().type('10/06/2025');

  selectMenu('monday', 'A');
  cy.wait(300);

  selectMenu('tuesday', 'B');
  cy.wait(300);

  selectMenu('wednesday', 'C');
  cy.wait(300);

  selectMenu('thursday', 'D');
  cy.wait(300);

  selectMenu('friday', 'E');

  cy.get('button').contains('Save').click();

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Meal Plan Created Successfully');
};

const addMealsToChild = () => {
  cy.get('div.route-list').within((items) => {
    cy.get('div.route-item').contains('Child').click();
  });

  cy.wait('@childRequest');

  cy.get('td').contains('Sophia Johnson').click();
  cy.wait('@childRequest');
  cy.wait('@nutritionRequest');

  cy.get('div.header-text h2').should('exist');
  cy.get('div.header-text h2').should('exist');
  cy.get('div.nutrition-section').should('exist');
  cy.get('app-child-meal-table').should('exist');

  cy.get('button:contains("Add Meal")').click();
  cy.get('input.date').click().type('10/06/2025');
  cy.get('button:contains("submit")').click();

  selectMealOption('monday', 'Broccoli and Garlic Stir Fry');
  checkMealOptionDoesNotExistAndSelectValid(
    'tuesday',
    'Broccoli and Potato Soup',
    'Tofu Stir Fry'
  );
  selectMealOption('wednesday', 'Garlic Roasted Potato');
  selectMealOption('thursday', 'Packed Lunch');
  selectMealOption('friday', 'Packed Lunch');

  cy.get('button').contains('Save').click();

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Meal Selection added Successfully');
};

const editChildMeal = () => {
  cy.get('tbody tr')
    .first()
    .within(() => {
      cy.get('button').click();
    });

  cy.wait(1000);
  cy.get('mat-select.meal-selection').click();
  cy.wait(500);
  cy.get('mat-option').contains(`Chicken and Bacon Stir Fry`).click();
  cy.get('button').contains('Save').click();

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Meal Selection updated Successfully');

  cy.wait('@editMealRequest');

  cy.get('tbody tr')
    .first()
    .within(() => {
      cy.get('td').first().contains('Chicken and Bacon Stir Fry');
    });
};

const navigateToMealPlans = () => {
  cy.get('div.route-list').within(() => {
    cy.get('div.route-item').contains('Meal Plans').click();
  });
};

const navigateToChildren = () => {
  cy.get('div.route-list').within((items) => {
    cy.get('div.route-item').contains('Child').click();
  });
  cy.get('td').contains('Sophia Johnson').click();
};

const deleteMealPlan = () => {
  cy.get('div.icons')
    .last()
    .within(() => {
      cy.get('mat-icon:contains("delete")').click();
    });

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Meal Plan Deleted Successfully');
};
