/// <reference types ='Cypress'/>
import { faker } from '@faker-js/faker'
import loadToken from '../../support/Auth'
import userData from '../../fixtures/data.json'

let totalCredit
let totalDebit
let total10Transaction
let savingId
let checkingId

describe('Detail Account', () => {
  let accessToken
  before(async () => {
    const response = await loadToken()
    accessToken = response.Authorization
  })
  it('User get list id saving account should be success', () => {
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

  it('User get detail account should be success success', () => {
    cy.api({
      method: 'GET',
      url: '/api/account/' + savingId,
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.credits).to.be.a('array')

      const credits = response.body.credits
      let totalCredit = credits.length
      const debits = response.body.debits
      let totalDebit = debits.length
      const last_10_transactions = response.body.last_10_transactions
      let total10Transaction = last_10_transactions.length

      for (let i = 0; i < totalCredit; i++) {
        expect(response.body.credits[i].date).not.to.be.null
        expect(response.body.credits[i].amount).not.to.be.null
        expect(response.body.credits[i].description).not.to.be.null
        expect(response.body.credits[i].account).not.to.be.null
        for (let j = 0; j < totalDebit; j++) {
          expect(response.body.debits[i].date).not.to.be.null
          expect(response.body.debits[i].amount).not.to.be.null
          expect(response.body.debits[i].description).not.to.be.null
          expect(response.body.debits[i].account).not.to.be.null
          for (let k = 0; k < total10Transaction; k++) {
            expect(response.body.last_10_transactions[i].date).not.to.be.null
            expect(response.body.last_10_transactions[i].transaction_type).not.to.be.null
            expect(response.body.last_10_transactions[i].ammount).not.to.be.null
          }
        }
      }
    })
  })
})
