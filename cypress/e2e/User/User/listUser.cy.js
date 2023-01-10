/// <reference types ='Cypress'/>
import loadToken from "../../../support/Auth"

describe("List Users", async () => {
  let accessToken
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
        });
      });
    });
  });
  it("Get User list archieve should be success get all data", () => {

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
      });
    });
  });
});