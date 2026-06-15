/// <reference types ='Cypress'/>
import { loadToken } from '../../support/Auth'
const faker = require('faker')

describe('User Login', () => {
    let accessToken
    before(() => {
      loadToken().then((token) => {
        accessToken = token
      })
    })
  it('Login user with valid data should be success', () => {
  expect(accessToken).to.be.a('string')

  })
})
