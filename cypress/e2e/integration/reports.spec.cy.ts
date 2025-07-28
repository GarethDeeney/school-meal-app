describe('Report Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/reports/nutrition-report').as('nutritionRequest');
    cy.intercept('GET', '/api/reports/cost-report').as('costRequest');

    cy.visit('/');
    cy.get('[class="log-in-button"]').click();
    cy.url().should('include', '/');
    cy.get('mat-sidenav-container').should('exist');

    cy.get('div.route-list').within(() => {
      cy.get('div.route-item').contains('Reports').click();
    });
  });

  it('GET Nutrition Reports', () => {
    cy.wait('@nutritionRequest');
    cy.get('h2').contains('Nutrition Report');
    cy.get('canvas#caloriesChart');
    cy.get('canvas#fatChart');
    cy.get('canvas#saturatesChart');
    cy.get('canvas#saltChart');
    cy.get('canvas#sugarChart');
  });

  it('GET Cost Reports', () => {
    cy.wait('@costRequest');
    cy.get('canvas#costReport');
  });
});
