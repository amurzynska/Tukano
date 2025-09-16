describe('Beckett CARDS order - Guest flow', () => {

  beforeEach(() => {
    cy.visit('https://beckett.com/');
  });

  it('should complete CARDS order as guest until checkout', () => {

    // 1. Navigate to section Cards
    cy.get('.navbar-toggler-icon').click();
    cy.contains('Grading').click();
    cy.contains('Cards').click();

    // 2. Choose Select Service option
    cy.contains('a[href*="standard"]', 'Submit now')
      .should('be.visible')
      .click();

    // 3. Add 5 cards to the order
    const numberOfCardsToAdd = 5;
    for (let i = 1; i <= numberOfCardsToAdd; i++) {
      addCard(i);
    }

    cy.get('[data-test-id="bottom-navigation-continue"]')
      .should('be.visible')
      .click();

    // 4. Fill out shipping information
    cy.fixture('shipping').then((data) => {
      fillShippingForm(data);
    });

    // 5. Proceed to checkout page
    cy.contains('button', 'Continue')
      .should('be.visible')
      .click();

    cy.get('input[type="checkbox"][required]')
      .check()
      .should('be.checked');

    cy.contains('button', 'Checkout')
      .should('be.enabled')
      .click();

    // 6. Verify data on payment page
    cy.url().should('include', '/payment');
    cy.title().should('eq', 'Submit Cards | Online Beckett Grading Submission');
    cy.contains('button', 'Submit Order').should('be.visible');

    cy.get('[data-test-id="order-summary"]')
      .should('be.visible');

    cy.contains('tr', 'CARDS')
      .find('td.text-nowrap.fw-thicker')
      .should('contain', numberOfCardsToAdd)
      .and('contain', 'x')
      .and('contain', '$34.95');

    cy.contains('tr', 'Oversized Card')
      .find('td.text-nowrap.fw-thicker')
      .should('contain', '1')
      .and('contain', 'x')
      .and('contain', '$8');
  });

});

// Helper function to add a card to the order
function addCard(i) {
  // Enter card number
  cy.contains('div', 'Search for each of your cards')
    .find('input')
    .clear()
    .type('2002');

  // Select dropdown option
  cy.get('[class*="dropdown-menu"]')
    .first()
    .find('button')
    .eq(i)
    .click();

  // Set quantity
  cy.get(`[id*="quantity${i}"]`)
    .should('be.visible')
    .clear({ force: true })
    .type('1')
    .should('have.value', '1');

  // Set declared value
  const declaredValue = i * 100;
  cy.get(`[id*="value${i}"]`)
    .should('be.visible')
    .clear({ force: true })
    .type(declaredValue)
    .should('have.value', declaredValue);

  // Oversized card for first card only
  if (i === 1) {
    cy.get('[data-test-id="0-oversized"]').click();
  }
}

// Helper function to fill shipping form
function fillShippingForm(data) {
  // Fill text inputs
  const textFields = ['firstName', 'lastName', 'email', 'phone', 'line1', 'city', 'zipcode'];
  textFields.forEach(field => {
    if (data[field] !== undefined) {
      cy.get(`#${field}`)
        .should('be.visible')
        .clear()
        .type(data[field]);
    }
  });

  // Select country and state
  if (data.country) {
    cy.get('#country').select(data.country);
  }
  if (data.state) {
    cy.get('#state')
      .should('be.visible')
      .select(data.state);
  }

  // Click shipping option if provided
  if (data.shippingOption) {
    cy.get(data.shippingOption).click();
  }
}