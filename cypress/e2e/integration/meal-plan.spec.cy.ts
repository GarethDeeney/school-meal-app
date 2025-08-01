import { selectMenu } from "../helpers";

describe('Meal Plan Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/mealplan').as('mealplanRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within(() => {
      cy.get('div.route-item').contains('Meal Plans').click();
    });

    cy.wait('@mealplanRequest');
  });

  it('GET Meal Plans', () => {
    cy.get('div.action-header').contains('Meal Plans');
  });

  it('POST Meal Plan', () => {
    cy.intercept('POST', '*/mealplan').as('mealplanAddRequest');

    cy.get('button').contains('Add Meal Plan').click();

    cy.get('div.dialog-container').should('exist');

    cy.get('mat-form-field').contains('Name').click().type('Test Meal Plan');
    cy.get('input.date').click().type('06/10/2025');

    selectMenu('monday', 'A');
    selectMenu('tuesday', 'B');
    selectMenu('wednesday', 'C');
    selectMenu('thursday', 'D');
    selectMenu('friday', 'E');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Meal Plan Created Successfully');

    cy.wait('@mealplanAddRequest');
  });

  it('PUT Meal Plan', () => {
    cy.intercept('PUT', '*/mealplan/*').as('mealplanEditRequest');

    cy.get('div.icons')
      .last()
      .within(() => {
        cy.get('mat-icon:contains("edit")').click();
      });

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Meal Plan 1');

    selectMenu('monday', 'E');
    selectMenu('tuesday', 'D');
    selectMenu('wednesday', 'F');
    selectMenu('thursday', 'B');
    selectMenu('friday', 'A');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Meal Plan Updated Successfully');

    cy.wait('@mealplanEditRequest');
  });

  it('DELETE Meal Plan', () => {
    cy.intercept('DELETE', '*/mealplan/*').as('mealplanDeleteRequest');

    cy.get('div.icons')
      .last()
      .within(() => {
        cy.get('mat-icon:contains("delete")').click();
      });

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Meal Plan Deleted Successfully');

    cy.wait('@mealplanDeleteRequest');
  });
});


