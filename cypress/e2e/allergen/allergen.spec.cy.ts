describe('Allegen Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/allergen').as('allergenRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Allergens').click();
    });

    cy.wait('@allergenRequest');
  });

  it('View Allergen Hub', () => {
    cy.get('div.action-header').contains('Allergen Hub');
    cy.get('table')
      .should('exist')
      .then((table) => {
        const rows = table.find('tr');
        expect(rows.length).to.be.greaterThan(0);
      });
  });

  it('Add Allergen', () => {
    cy.intercept('POST', '*/allergen').as('allergenAddRequest');

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

    cy.wait('@allergenAddRequest');
  });

  it('Edit Allegen', () => {
    cy.intercept('PUT', '*/allergen/*').as('allergenEditRequest');

    cy.get('button.menu-test-allergen').click();

    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Edit').click();

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Allergen 1');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Allergen Updated Successfully');

    cy.wait('@allergenEditRequest');
  });

  it('Delete Allegen', () => {
    cy.intercept('DELETE', '*/allergen/*').as('allergenDeleteRequest');
    cy.get('button.menu-test-allergen').click();
    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Delete').click();

    cy.wait('@allergenDeleteRequest');
  });
});

// not required just one big of the above really?
describe.skip('Allergen End to End Tests', () => {
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
