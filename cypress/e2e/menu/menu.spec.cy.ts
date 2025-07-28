describe('Menu Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/menu').as('menuRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Menus').click();
    });

    cy.wait('@menuRequest');
  });

  it.only('View Menu Hub', () => {
    cy.get('div.action-header').contains('Menus');
  });

  it.only('Add Ingredient', () => {
    cy.intercept('POST', '*/menu').as('menuAddRequest');

    cy.get('button').contains('Create Menu').click();

    cy.get('div.dialog-container').should('exist');

    cy.get('mat-form-field').contains('Name').click().type('Test Menu');

    addMealToMenu('1', 'Grilled Chicken Salad');

    cy.get('button').contains('Add Meal').click();
    cy.wait(500);

    addMealToMenu('2', 'Balanced Lunch Box');

    cy.get('button').contains('Add Meal').click();
    cy.wait(500);

    addMealToMenu('3', 'Fish Finger Meal');

    cy.get('button').contains('Add Meal').click();
    cy.wait(500);

    addMealToMenu('4', 'Lentil & Tomato Soup');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Menu Created Successfully');

    cy.wait('@menuAddRequest');
  });

  it.only('Edit Ingredient', () => {
    cy.intercept('PUT', '*/menu/*').as('menuEditRequest');

    cy.get('div.icons')
      .last()
      .within(() => {
        cy.get('mat-icon:contains("edit")').click();
      });

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Menu 1');

    addMealToMenu('1', 'Broccoli and Potato Soup');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Menu Updated Successfully');

    cy.wait('@menuEditRequest');
  });

  it.only('Delete Ingredient', () => {
    cy.intercept('DELETE', '*/menu/*').as('menuDeleteRequest');

    cy.get('div.icons')
      .last()
      .within(() => {
        cy.get('mat-icon:contains("delete")').click();
      });

    cy.wait('@menuDeleteRequest');
  });
});

const addMealToMenu = (index: string, meal: string) => {
  cy.get(`mat-select.meal-${index}`).click();
  cy.get('mat-option').contains(`${meal}`).click();
};
