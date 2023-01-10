/// <reference types="cypress" />

const faker = require('faker');

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  on("task", {
    freshUser() {
      user = {
        "username": "jsmith",
        "password": "demo1234"
      };
      return user;
    }
  })
  return config
}