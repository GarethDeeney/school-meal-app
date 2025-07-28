import {
  checkMealOptionDoesNotExistAndSelectValid,
  selectMealOption,
  selectMenu,
} from '../helpers';

describe('Allergen and Add to Child', () => {
  it('Create Allergen and add to child', () => {
    cy.intercept('GET', '*/allergen').as('allergenRequest');
    cy.intercept('POST', '*/allergen').as('addAllergenRequest');
    cy.intercept('GET', '*/child').as('childRequest');
    cy.intercept('PUT', '*/child/*').as('editChildRequest');

    // navigate to app
    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    navigateToAllergens();
    cy.wait('@allergenRequest');

    addAllergen();
    cy.wait('@addAllergenRequest');
    cy.get('tbody td:contains("Test Allergen")');

    navigateToChildren();
    cy.wait('@childRequest');

    addAllergenToChild();
    cy.wait('@editChildRequest');

    cy.wait(1000);

    // Tidy up test data for retest
    removeAllergenFromChild();

    navigateToAllergens();
    deleteAllergen();
  });
});

const addAllergen = () => {
  cy.get('button').contains('Add Allergen').click();

  cy.get('div.dialog-container').should('exist');

  cy.get('mat-form-field').contains('Name').click().type('Test Allergen');
  cy.get('mat-form-field').contains('Reaction').type('Test Reaction');
  cy.get('mat-form-field')
    .contains('Special Requirements')
    .type('Test Special Requirements');

  cy.get('button').contains('Save').click();

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Allergen Created Successfully');
};

const openChildDialog = () => {
  cy.get('tbody tr')
    .first()
    .within(() => {
      cy.get('button').click();
    });
  cy.get('button:contains("edit")').click();
  cy.get('div.dialog-container').should('exist');
  cy.wait('@allergenRequest');
  cy.wait(1000);
};

const saveChildUpdate = () => {
  cy.get('button').contains('Save').click();

  cy.get('simple-snack-bar')
    .should('exist')
    .contains('Child Updated Successfully');
};

const addAllergenToChild = () => {
  openChildDialog();

  cy.get('mat-select').click();
  cy.get('mat-option').contains('Test Allergen').click();
  cy.get('body').click();

  saveChildUpdate();
};

const removeAllergenFromChild = () => {
  openChildDialog();

  cy.get('mat-select').click();
  cy.get('mat-option').last().click({ force: true });
  cy.get('body').click();

  saveChildUpdate();
};

const navigateToAllergens = () => {
  cy.get('div.route-list').within(() => {
    cy.get('div.route-item').contains('Allergens').click();
  });
};

const navigateToChildren = () => {
  cy.get('div.route-list').within((items) => {
    cy.get('div.route-item').contains('Child').click();
  });
};

const deleteAllergen = () => {
  cy.intercept('DELETE', '*/allergen/*').as('allergenDeleteRequest');
  cy.get('button.menu-test-allergen').click();
  cy.get('div.mat-mdc-menu-content').should('exist');
  cy.get('button').contains('Delete').click();
};
