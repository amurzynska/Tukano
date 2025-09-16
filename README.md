# Beckett CARDS Order Automation

## 1. Architecture / Project Structure

This repository contains Cypress tests for automating the Beckett CARDS order flow as a guest user.

**Key files and folders:**

- `cypress/e2e/guestFlow.cy.js` – main test file containing the end-to-end scenario for ordering CARDS.
- `cypress/fixtures/shipping.json` – test data for filling shipping forms.
- `README.md` – project documentation.

**Project Structure:**

```
cypress/
 ├─ e2e/
 │   └─ guestFlow.cy.js
 ├─ fixtures/
 │   └─ shipping.json
 └─ support/
     └─ commands.js (optional)
cypress.config.js
package.json
README.md
```

---

## 2. Requirements

- Node.js >= 16.x
- NPM >= 8.x
- Cypress >= 15.x (tested with 15.2.0)

---

## 3. Installation / Setup

Install dependencies:

```bash
npm ci
# or
npm install
```

---

## 4. Running Tests

- **Interactive mode (Cypress GUI):**

```bash
npx cypress open
```

- **Headless mode (CI/CD or terminal):**

```bash
npx cypress run
```

---

## 5. Fixtures

The `cypress/fixtures/shipping.json` file contains the shipping form data used in the test. This allows test data to be separated from test logic for easier maintenance.

Example content:

```json
{
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jkowalski@gmail.com",
  "phone": "+48555555555",
  "country": "Poland",
  "line1": "Tarnowska 18",
  "city": "Nowy Sącz",
  "state": "Podkarpackie Voivodeship",
  "zipcode": "33-300",
  "shippingOption": "#shipping-International"
}
```

---

## 6. Notes

- All test data like card numbers, quantities, and declared values are currently hard-coded in the test helpers.
- Cypress commands like `.should('be.visible')`, `.check()`, and `.click()` are used for robust assertions and interactions.
- Helper functions `addCard(i)` and `fillShippingForm(data)` improve readability and reduce duplication.
