const { defineConfig } = require('cypress')
const webpack = require('@cypress/webpack-preprocessor')
const path = require('path')
// Populate process.env with values from .env file
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true,
    html: false,
    overwrite: false,
    json: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      path.resolve(__dirname, './cypress/support')
      require('cypress-mochawesome-reporter/plugin')(on)

      on(
        'file:preprocessor',
        webpack({
          webpackOptions: {
            resolve: {
              alias: {
                '@Support': path.resolve(__dirname, 'cypress/support'),
                '@Fixtures': path.resolve(__dirname, 'cypress/fixtures'),
                '@Utils': path.resolve(__dirname, 'cypress/utils'),
              },
            },
          },
        }),
      )
      return config
    },
    paths: {
      '@components': 'cypress/support',
    },
    baseUrl: 'https://demo.testfire.net',
    chromeWebSecurity: false,
  },
})
