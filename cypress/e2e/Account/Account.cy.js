/// <reference types ='Cypress'/>
import loadToken from '@Support/Auth'

let emailExist
let employeeCode
describe('Get Account', () => {
  let accessToken
  before(async () => {
    const response = await loadToken()
    accessToken = response.Authorization
  })

  it('User get account should be success success', () => {
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

      var data = response.body.Accounts

      data.forEach((item, i) => {
        expect(item.id).to.not.be.null
        expect(item.Name).to.not.be.null
      })
    })
  })
})
