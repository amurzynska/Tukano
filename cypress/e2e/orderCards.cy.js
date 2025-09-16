describe('Beckett CARDS order - Guest flow', () => {

  beforeEach(() => {
    cy.visit('https://beckett.com/')
  })

  it('should complete CARDS order as guest until checkout', () => {

    // 1. Navigate to section Cards
    cy.get(".navbar-toggler-icon").click()
    cy.contains('Grading').click()
    cy.contains('Cards').click()

    // 2. Choose Select Service option
    cy.contains('a[href*="standard"]', 'Submit now').click()

    // 3. Add 5 cards to the order
    for (let i = 1; i <= 5; i++) {
      cy.contains('div', 'Search for each of your cards').find('input').type('2002');
      cy.get('[class*="dropdown-menu"]').first().find('button').eq(i).click()

      // Set quantity = 1
      cy.get('#quantity1').clear().type('1')

      // Set declared value
      cy.get(`[id*="value${i}"]`).clear().type(i * 100)

      // Set Oversized Card for the first card
      if (i === 1) {
        cy.get('[data-test-id="0-oversized"]').click()
      }
    }
    cy.get('[data-test-id="bottom-navigation-continue"]').click()
  
  });
});