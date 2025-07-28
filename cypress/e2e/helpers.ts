const selectMenu = (day: string, setMeal: string) => {
  cy.get(`mat-select.${day}`).click();
  cy.get('mat-option').contains(`Set Meal ${setMeal}`).click();
};

const addMealToMenu = (index: string, meal: string) => {
  cy.get(`mat-select.meal-${index}`).click();
  cy.get('mat-option').contains(`${meal}`).click();
};

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
