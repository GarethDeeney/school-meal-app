describe('Ingredient Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/ingredient').as('ingredientRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Ingredients').click();
    });

    cy.wait('@ingredientRequest');
  });

  it.only('View Ingredient Hub', () => {
    cy.get('div.action-header').contains('Ingredient Hub');
    cy.get('table')
      .should('exist')
      .then((table) => {
        const rows = table.find('tr');
        expect(rows.length).to.be.greaterThan(0);
      });
  });

  it.only('Add Ingredient', () => {
    cy.intercept('POST', '*/ingredient').as('ingredientAddRequest');

    cy.get('button').contains('Add Ingredient').click();

    cy.get('div.dialog-container').should('exist');

    cy.get('mat-form-field').contains('Name').click().type('Test Ingredient');
    cy.get('mat-select').click();
    cy.get('mat-option').contains('Peanuts').click();
    cy.get('body').click();
    cy.get('mat-form-field').contains('Price Per kg').type('1');
    cy.get('mat-form-field').contains('Calories').type('150');
    cy.get('mat-form-field').contains('Energy').type('300');
    cy.get('mat-form-field').contains('Fats').type('1');
    cy.get('mat-form-field').contains('Saturates').type('2.3');
    cy.get('mat-form-field').contains('Sugars').type('3');
    cy.get('mat-form-field').contains('Salt').type('0');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Ingredient Created Successfully');

    cy.wait('@ingredientAddRequest');
  });

  it.only('Edit Ingredient', () => {
    cy.intercept('PUT', '*/ingredient/*').as('ingredientEditRequest');

    cy.get('button.menu-test-ingredient').click();

    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Edit').click();

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Ingredient 1');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Ingredient Updated Successfully');

    cy.wait('@ingredientEditRequest');
  });

  it.only('Delete Ingredient', () => {
    cy.intercept('DELETE', '*/ingredient/*').as('ingredientDeleteRequest');
    cy.get('button.menu-test-ingredient').click();
    cy.get('div.mat-mdc-menu-content').should('exist');
    cy.get('button').contains('Delete').click();

    cy.wait('@ingredientDeleteRequest');
  });
});

// not required just one big of the above really?
describe.skip('Ingredient End to End Tests', () => {
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

    //  make sure no ingredients are available to choose?

    // View Child Hub

    // Add Child to Hub

    // View Child Record

    // Edit Child

    // Update Name

    // Update Ingredients

    // Cancel Button Click

    // Edit again

    // View Child Record with Updated Information

    // Return to hub and delete child
  });
});
