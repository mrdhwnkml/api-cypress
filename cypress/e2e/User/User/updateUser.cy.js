/// <reference types ='Cypress'/>
import {
  faker
} from '@faker-js/faker';
import loadToken from "../../../support/Auth"
import userData from '../../../fixtures/data.json'

describe('Update User', async () => {
  let accessToken
  let idUser
  // const userID = localStorage.getItem('id')

  before(async () => {
    const response = await loadToken()
    accessToken = response.data.token
    //   await userID()
    //   userID = response.data.id
  })
  it('Create user with valid data should be success register', () => {
    cy.api({
        method: 'POST',
        url: '/account/v1/user',
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "email": faker.internet.email(),
          "password": userData.password,
          "password_confirm": userData.password,
          "region_id": 1,
          "parent_id": 1,
          "site_id": 1,
          "territory_id": 1,
          "employee_code": `EP${faker.random.numeric(5)}`,
          "phone_number": `08${faker.random.numeric(10)}`,
          "main_role": 1,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('status', 'success')

        idUser = response.body.data.id
      })
  })
  it('Update user with same roles should success to update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "region_id": 1,
          "parent_id": 1,
          "site_id": 1,
          "territory_id": 1,
          "phone_number": `08${faker.random.numeric(10)}`,
          "main_role": 1,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('status', 'success')
      })
  })
  it('Update user with not same roles should faild to update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "region_id": 1,
          "parent_id": 1,
          "site_id": 1,
          "territory_id": 1,
          "phone_number": `08${faker.random.numeric(10)}`,
          "main_role": 8,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.sub_role).to.equal("The sub roles division is different as main role division")
      })
  })
  it('Update user with valid data should be success update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "region_id": 1,
          "parent_id": 1,
          "site_id": 1,
          "territory_id": 1,
          "phone_number": `08${faker.random.numeric(10)}`,
          "main_role": 1,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('status', 'success')
      })
  })
  it.skip('Update user using an existing data should success to Update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {}
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property('status', 'success')
      })
  })
  it('Update user using region_id and site_id null values should fail to Update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "region_id": null,
          "parent_id": 1,
          "site_id": null,
          "territory_id": 1,
          "phone_number": `08${faker.random.numeric(10)}`,
          "main_role": 8,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.region_id).to.equal("The region_id field is required.")
        expect(response.body.errors.site_id).to.equal("The site_id field is required.")
      })
  })
  it('Update user using phone_number is null values should fail to Update', () => {
    cy.api({
        method: 'PUT',
        url: '/account/v1/user/' + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "name": faker.name.fullName(),
          "nickname": faker.name.lastName(),
          "region_id": 1,
          "parent_id": 1,
          "site_id": 1,
          "territory_id": 1,
          "phone_number": null,
          "main_role": 1,
          "sub_roles": [
            faker.datatype.number({
              min: 2,
              max: 6
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.phone_number).to.equal("The phone_number field is required.")
      })
  })
});