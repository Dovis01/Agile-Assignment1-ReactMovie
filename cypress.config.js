const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    viewportWidth: 1980,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    specPattern: 'cypress/component/**/*.cy.{js,jsx}',
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
