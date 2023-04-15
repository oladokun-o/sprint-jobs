import cypress from "cypress";

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the resources text', () => {
    cy.get('p')
      .contains('site works!');
  });
});
