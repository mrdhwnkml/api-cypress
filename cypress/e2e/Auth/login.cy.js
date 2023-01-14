/// <reference types ='Cypress'/>
const faker = require("faker");
describe('User Login', () => {
  let signUpData

  before(() => {
    cy.fixture('data').then((data) => {
      signUpData = data;
    })
  })
  it('Login user with valid data should be success', () => {
    cy.api({
        method: 'POST',
        url: 'api/login',
        failOnStatusCode: false,
        body: {
          "username": signUpData.email,
          "password": signUpData.password
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('Authorization');
        expect(response.body.success).to.equal(signUpData.email +' '+'is now logged in')
        cy.log(response.body.Authorization)

        var token = response.body.Authorization
        localStorage.setItem("token", token)
        // localStorage.getItem('id')
      })
  })
});