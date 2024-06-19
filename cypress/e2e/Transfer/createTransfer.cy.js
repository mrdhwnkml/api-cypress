/// <reference types ='Cypress'/>
import { faker } from '@faker-js/faker'
import loadToken from '@Support/Auth'

let savingId
let checkingId
let transferAmount = 100

describe('Create Transfer', () => {
  let accessToken

  before(async () => {
    const response = await loadToken()
    accessToken = response.Authorization
  })
  it('User get list of account should be success', () => {
    cy.api({
      method: 'GET',
      url: '/api/account',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.Accounts).to.be.a('array')
      const count = response.body.Accounts
      let length = count.length

      for (let i = 0; i < length; i++) {
        expect(response.body.Accounts[i].Name).not.to.be.null
        expect(response.body.Accounts[i].id).not.to.be.null
        savingId = response.body.Accounts[0].id
        checkingId = response.body.Accounts[1].id
      }
    })
  })

  it('User transfer with valid data should be success register', () => {
    cy.api({
      method: 'POST',
      url: '/api/transfer',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: {
        toAccount: savingId,
        fromAccount: checkingId,
        transferAmount: transferAmount,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.success).not.to.be.null
    })
  })
  it('User transfer with invalid data(toAccount) should be success register', () => {
    cy.api({
      method: 'POST',
      url: '/api/transfer',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: {
        toAccount: faker.datatype.number({ min: 10, max: 100 }),
        fromAccount: checkingId,
        transferAmount: transferAmount,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(500)
    })
  })

  it('User transfer with invalid data(fromAccount) should be success register', () => {
    cy.api({
      method: 'POST',
      url: '/api/transfer',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: {
        toAccount: savingId,
        fromAccount: faker.datatype.number({ min: 10, max: 100 }),
        transferAmount: transferAmount,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(500)
    })
  })
})
