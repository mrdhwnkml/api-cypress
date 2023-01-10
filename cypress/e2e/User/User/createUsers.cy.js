/// <reference types ='Cypress'/>
import {
  faker
} from '@faker-js/faker';
import loadToken from "../../../support/Auth"
import userData from '../../../fixtures/data.json'

let emailExist
let employeeCode
describe('Create User', () => {
  let accessToken
  before(async () => {
    const response = await loadToken()
    accessToken = response.body.Authorization
  })

  it.only('Create user with valid data should be success register', () => {
    cy.api({
        method: 'POST',
        url: '/api/admin/addUser',
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "firstname": faker.name.fullName(),
          "lastname": faker.name.lastName(),
          "username": faker.name.middleName(),
          "password1": abcde12345,
          "password2": abcde12345,
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.success).to.equal("Requested operation has completed successfully.")

        emailExist = response.body.data.email
        employeeCode = response.body.data.employee_code
        const id = response.body.data.id
        localStorage.setItem("id", id)
        cy.setCookie('id', id.toString())

      })
  })
  it('Create user using an existing email should fail to register', () => {
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
          "email": emailExist,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.email).to.equal("The email already exists")
      })
  })
  it('Create user using region_id and site_id null values should fail to register', () => {
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
          "region_id": null,
          "parent_id": null,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.region_id).to.equal("The region_id field is required.")
      })
  })
  it('Create user using invalid email format should fail to register', () => {
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
          "email": userData.password,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.email).to.equal("The email must be a valid email address.")
      })
  })
  it('Create user using not match password should fail to register', () => {
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
          "password": userData.email,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.password).to.equal("The password is not match")
      })
  })
  it('Create user using employee_code is null values should fail to register', () => {
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
          "employee_code": null,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.employee_code).to.equal("The employee_code field is required.")
      })
  })
  it('Create user using phone_number is null values should fail to register', () => {
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
  it('Create user using invalid roles should fail to register', () => {
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
            1
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.sub_role).to.equal("The sub roles is same as main role")
      })
  })
  it('Create user with The employee code is already exists should be fail register', () => {
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
          "employee_code": employeeCode,
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
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.employee_code).to.equal("The employee code is already exists")
      })
  })
  it('Create user using invalid match main_roles and sub_roles should fail to register', () => {
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
              min: 99
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.sub_role).to.equal("The sub roles division is different as main role division")
      })
  })
  it('Create user using invalid match main_roles and sub_roles should fail to register', () => {
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
          "main_role": 8,
          "sub_roles": [
            faker.datatype.number({
              min: 60,
              max: 99
            })
          ]
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(422);
        expect(response.body.errors.sub_role).to.equal("The sub roles division is different as main role division")
      })
  })
});