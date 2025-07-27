describe('Child Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/child').as('childRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Child').click();
    });

    cy.wait('@childRequest');
  });

  it('GET Child Record', () => {
    cy.intercept('GET', '*/child/*').as('childRequest');
    cy.intercept('GET', '*/child/*/nutrition').as('nutritionRequest');

    cy.get('td').contains('Sophia Johnson').click();
    cy.wait('@childRequest');
    cy.wait('@nutritionRequest');

    cy.get('div.header-text h2').should('exist');
    cy.get('div.header-text h2').should('exist');
    cy.get('div.nutrition-section').should('exist');
    cy.get('app-child-meal-table').should('exist');
  });

  it('GET Child Hub', () => {
    cy.get('table')
      .should('exist')
      .then((table) => {
        const rows = table.find('tr');
        expect(rows.length).to.be.greaterThan(0);
      });
  });

  it('POST Child', () => {
    cy.intercept('POST', '*/child').as('childAddRequest');

    cy.get('button').contains('Add Child').click();

    cy.get('div.dialog-container').should('exist');

    cy.get('mat-form-field').contains('Name').click().type('Test Name');
    cy.get('mat-form-field').contains('Year').type('1');
    cy.get('mat-select').click();
    cy.get('mat-option').contains('Peanuts').click();
    cy.get('body').click();

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Child Created Successfully');

    cy.wait('@childAddRequest');
  });

  it('PUT Child', () => {
    cy.intercept('PUT', '*/child/*').as('childEditRequest');

    cy.get('button.menu-test-name').click();

    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Edit').click();

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Name 1');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Child Updated Successfully');

    cy.wait('@childEditRequest');
  });

  it('DELETE Child', () => {
    cy.intercept('DELETE', '*/child/*').as('childDeleteRequest');
    cy.get('button.menu-test-name').click();
    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Delete').click();

    cy.wait('@childDeleteRequest');
  });
});

describe.skip('Child End to End Tests', () => {
  it('Add Meals for Child', () => {
    // Expected API Calls
    cy.intercept('GET', '*/child').as('childRequest');
    cy.intercept('GET', '*/child/*').as('childRequest');
    cy.intercept('POST', '*/child').as('childAddRequest');
    cy.intercept('PUT', '*/child/*').as('childEditRequest');
    cy.intercept('DELETE', '*/child/*').as('childDeleteRequest');
    cy.intercept('GET', '*/child/*/nutrition').as('nutritionRequest');

    // Log into App
    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Child').click();
    });

    cy.wait('@childRequest');

    cy.get('table')
      .should('exist')
      .then((table) => {
        const rows = table.find('tr');
        expect(rows.length).to.be.greaterThan(0);
      });

    // View Child Record
    cy.get('td').contains('Sophia Johnson').click();
    // cy.wait(500);
    cy.wait('@childRequest');
    cy.wait('@nutritionRequest');
    cy.get('div.header-text h2').should('exist');
    cy.get('div.header-text h2').should('exist');
    cy.get('div.nutrition-section').should('exist');
    cy.get('app-child-meal-table').should('exist');

    // Add Meal to Child?

    // Edit Childs meals

    //  make sure no allergens are available to choose?

    // View Child Hub

    // Add Child to Hub

    // View Child Record

    // Edit Child

    // Update Name

    // Update Allergens

    // Cancel Button Click

    // Edit again

    // View Child Record with Updated Information

    // Return to hub and delete child
  });
});
