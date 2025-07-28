describe('Meal Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '*/meal').as('mealRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within((items) => {
      cy.get('div.route-item').contains('Meals').click();
    });

    cy.wait('@mealRequest');
  });

  it('GET Meals', () => {
    cy.get('div.action-header').contains('Meal Hub');
  });

  it('POST Meal', () => {
    cy.intercept('POST', '*/meal').as('mealAddRequest');

    cy.get('button').contains('Add Meal').click();

    cy.get('div.dialog-container').should('exist');

    cy.get('mat-form-field').contains('Name').click().type('Test Meal');

    addIngredient('1', 'Chicken Breast', '50');

    cy.get('button').contains('Add Ingredient').click();
    addIngredient('2', 'Carrots', '100');

    cy.get('button').contains('Add Ingredient').click();
    addIngredient('3', 'Onions', '20');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Meal Created Successfully');

    cy.wait('@mealAddRequest');
  });

  it('PUT Meal', () => {
    cy.intercept('PUT', '*/meal/*').as('mealEditRequest');

    cy.get('div.meal-card-header h2:contains(Test Meal)').parent('div').within(() => {
      cy.get('mat-icon:contains(edit)').click();
    })

    cy.get('input').first().clear();
    cy.get('input').first().clear();
    cy.get('input').first().type('Test Meal 1');

    cy.get('button').contains('Save').click();

    cy.get('simple-snack-bar')
      .should('exist')
      .contains('Meal Updated Successfully');

    cy.wait('@mealEditRequest');
  });

  it('DELETE Meal', () => {
    cy.intercept('DELETE', '*/meal/*').as('mealDeleteRequest');
    cy.get('div.meal-card-header h2:contains(Test Meal 1)').parent('div').within(() => {
      cy.get('mat-icon:contains(delete)').click();
    })

    cy.wait('@mealDeleteRequest');
  });
});

const addIngredient = (
  index: string,
  ingredientName: string,
  amount: string
) => {
  cy.get(`mat-select.ingredient-${index}`).click();
  cy.get('mat-option').contains(`${ingredientName}`).click();
  cy.get('body').click();
  cy.get(`input.ingredient-${index}`).click().type(`${amount}`);
};
