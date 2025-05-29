const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://petstore.swagger.io',
    watchForFileChanges:false,
    defaultCommandTimeout:6000,
    viewportHeight:700,
    viewportWidth:750,
    retries:3,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
