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
