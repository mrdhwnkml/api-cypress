/// <reference types ='Cypress'/>
import loadToken from "../../../support/Auth"

describe("Detail Users", async () => {
  let accessToken
  let idUser
  before(async () => {
    const response = await loadToken()
    accessToken = response.data.token
  })

  context("When I send GET user", async () => {
    it("Get User list without query params should be success get all data", () => {

      cy.api({
        method: "GET",
        url: "/account/v1/user",
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).should((response) => {
        expect(response.status).to.eq(200);

        var data = response.body.data

        data.forEach((item, i) => {
          expect(item.id).to.not.be.null;
          expect(item.email).to.not.be.null;
          idUser = response.body.data[0].id
        });
      });
    });

    it("Get User detail should be success get all data", () => {

      cy.api({
        method: "GET",
        url: "/account/v1/user/" + idUser,
        failOnStatusCode: false,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data.employee_code).to.not.be.null;
        expect(response.body.data.id).to.not.be.null;
        expect(response.body.data.name).to.not.be.null;
        expect(response.body.data.nickname).to.not.be.null;
        expect(response.body.data.email).to.not.be.null;
        expect(response.body.data.phone_number).to.not.be.null;
        expect(response.body.data.main_role.id).to.not.be.null;
        expect(response.body.data.main_role.division.id).to.not.be.null;
      });
    });
  });
});