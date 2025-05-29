
# 🐾 Petstore API Test Suite (Cypress)

[![CI](https://github.com/yourusername/petstore-api-cypress/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/petstore-api-cypress/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-4e9fef.svg)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

This project contains a suite of automated API tests written in [Cypress](https://www.cypress.io/) for the [Swagger Petstore](https://petstore.swagger.io/) API. It is designed to validate the core functionality of the Petstore's RESTful endpoints including pets, store, and users.

## 🚀 Features

- Comprehensive API testing using Cypress
- Organized test cases for:
  - Pet endpoints
  - Store endpoints
  - User endpoints
- JSON Schema validation (optional, if added)
- Environment-specific configuration
- CI/CD ready

## 📦 Project Structure

\`\`\`
petstore-api-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── pets.cy.js
│   │   ├── store.cy.js
│   │   └── users.cy.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
\`\`\`

## 🛠️ Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/GargGeetika/petstore-api-cypress.git
cd petstore-api-cypress
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

## 🧪 Running the Tests

Run all tests in headless mode (suitable for CI/CD):

\`\`\`bash
npx cypress run
\`\`\`

Or open the Cypress Test Runner in interactive mode:

\`\`\`bash
npx cypress open
\`\`\`

## ⚙️ Configuration

Customize the \`baseUrl\` and environment variables in \`cypress.config.js\`:

\`\`\`js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
\`\`\`

## ✅ Example Test

\`\`\`js
describe('Petstore - Pet Endpoint', () => {
  it('should add a new pet', () => {
    cy.request('POST', '/pet', {
      id: 1001,
      name: 'Fluffy',
      status: 'available'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Fluffy')
    })
  })
})
\`\`\`

## 📂 Environment Variables

Set environment variables via the CLI:

\`\`\`bash
npx cypress run --env baseUrl=https://custom-url.com
\`\`\`

Or via \`cypress.env.json\`:

\`\`\`json
{
  "baseUrl": "https://petstore.swagger.io/v2"
}
\`\`\`

## 📋 To Do

- [ ] Add tests for edge cases
- [ ] Add CI/CD pipeline (e.g., GitHub Actions)

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
