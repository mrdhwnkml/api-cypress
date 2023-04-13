/// <reference types ='Cypress'/>

import loadToken from '@Support/Auth'
const dashUrl = Cypress.env('dasboard_url')

describe('Dispose List Pack', () => {
  let accessToken
  let saveidPacking
  let checkstatusPack
  let getpackType
  let newActual
  let saveActual
  let packType
  let savepackType
  let savepacktypeFail
  let getdataPack
  let countPack
  let saveidpackingCancel
  let checkactualPack
  let newActualPack
  let itemId
  let totalweightScale

  before(async () => {
    const response = await loadToken()
    accessToken = response.data.token
  })
  it.skip('User can access list pack and should be success', () => {
    cy.api({
      method: 'GET',
      url: 'endpoint',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.status).to.be.equal('success')

      //Untuk mengambil total data di array.
      let getData = response.body.data
      //Untuk mengambil jumal data array. Ex: 10
      let newData = getData.length
      for (let i = 0; i <= newData - 1; i++) {
        checkstatusPack = response.body.data[i].status
        checkactualPack = response.body.data[i].actual_total_pack
        if (checkstatusPack == 1 && checkactualPack == 0) {
          saveidPacking = response.body.data[i].packing_order.id
          getpackType = response.body.data[i].pack_type
          totalweightScale = response.body.data[i].weight_scale
        } else {
          saveidpackingCancel = response.body.data[i].packing_order.id
        }
      }
    })
  })
  it.skip(' User can access detail packing order and should be success', () => {
    cy.api({
      method: 'GET',
      url: 'endpoint',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.status).to.be.equal('success')
      getdataPack = response.body.data.packing_recommendation
      countPack = getdataPack.length

      for (let i = 0; i <= countPack - 1; i++) {
        for (let k = 0; k <= 6; k++) {
          packType = response.body.data.packing_recommendation[i].item_pack[k]
          if (packType.actual_total_pack < packType.expected_total_pack && packType.expected_total_pack != 0) {
            saveActual = packType.actual_total_pack
            itemId = response.body.data.packing_recommendation[i].item_id
            savepackType = packType.pack_type
            saveidPacking = response.body.data.packing_recommendation[0].packing_order.id
          } else {
            savepacktypeFail = packType.pack_type
          }
        }
      }
    })
  })
})
