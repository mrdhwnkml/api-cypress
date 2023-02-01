/// <reference types ='Cypress'/>
import { faker } from '@faker-js/faker'
import loadToken from '../../support/Auth'
import userData from '../../fixtures/data.json'

describe('Create User', () => {
  let accessToken
  before(async () => {
    const response = await loadToken()
    accessToken = response.Authorization
  })

  it('Create user with valid data should be success register', () => {
    cy.api({
      method: 'POST',
      url: '/api/admin/addUser',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: {
                 firstname: faker.name.fullName(),
             lastname: faker.name.lastName(),
             username: faker.name.middleName(),
        password1: 'abcde12345',
        password2: 'abcde12345',
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.success).to.equal('Requested operation has completed successfully.')
      cy.log(accessToken)
    })
  })
})
