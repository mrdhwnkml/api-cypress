const { defineConfig } = require('cypress')

// Populate process.env with values from .env file
module.exports = defineConfig({
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)  
      
    },
    baseUrl: 'https://demo.testfire.net',
    "chromeWebSecurity": false,
  },
})
