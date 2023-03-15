import data from '../../fixtures/data.json'
import { faker } from '@faker-js/faker'

const cmaURL = Cypress.env('mobile_url')
import { loadTokenCustomerApps, loadTokenDashboard } from '../../support/Auth'
import { createVoucher, getActiveVoucher } from '../../utils/Promotion/voucher'

describe('Apply Voucher on Mobile', async () => {
  let accessToken
  let header = data.header
  let voucherActive
  let voucherNonActive
  before(async () => {
    const response = await loadTokenCustomerApps()
    accessToken = response.data.token

    //Menambahkan bearer token
    header.Authorization = 'Bearer ' + accessToken

    const tokenDash = await loadTokenDashboard()

    const responseCreate = await createVoucher(tokenDash.data.token)
    //Mengambil 'data' yang ada
    voucherNonActive = responseCreate.data

    voucherActive = await getActiveVoucher(header, data)
  })

  it('Apply Voucher Type Total Discount with Active Redeem Code should success', () => {
    cy.api({
      method: 'POST',
      url: cmaURL + '/v1/promotion/voucher/valid-promo',
      failOnStatusCode: false,
      headers: header,
      body: {
        platform: data.platform,
        data: {
          region_id: '1',
          address_id: '1',
          //Mengambil code reddem dari data
          redeem_code: voucherActive.redeem_code,
          total_price: faker.datatype.number({ min: 100000, max: 200000 }),
          total_charge: faker.datatype.number({ min: 100000, max: 200000 }),
          voucher_items: [
            {
              item_id: '1',
              order_qty: faker.datatype.number({ min: 10, max: 20 }),
            },
            {
              item_id: '2',
              order_qty: faker.datatype.number({ min: 10, max: 20 }),
            },
            {
              item_id: '4',
              order_qty: faker.datatype.number({ min: 10, max: 20 }),
            },
          ],
        },
      },
    }).should((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body.status).to.be.equal('success')
    })
  })
 
  it('Apply Voucher Type Total Discount with invalid Start date should error', () => {
    cy.api({
      method: 'POST',
      url: cmaURL + '/v1/promotion/voucher/valid-promo',
      failOnStatusCode: false,
      headers: header,
      body: {
        platform: data.platform,
        data: {
          region_id: String(voucherNonActive.region.id),
          address_id: '1',
          redeem_code: voucherNonActive.redeem_code,
          total_price: faker.datatype.number({ min: 10000, max: 20000 }),
          total_charge: faker.datatype.number({ min: 10000, max: 20000 }),
          voucher_items: [
            {
              item_id: '1',
              order_qty: faker.datatype.number({ min: 10, max: 20 }),
            },
          ],
        },
      },
    }).should((response) => {
      expect(response.status).to.be.equal(422)
      expect(response.body.errors.redeem_code).to.be.equal('Voucher belum dapat digunakan')
    })
  })
  it('Apply Voucher Type Total Discount with invalid Area ', () => {
    cy.api({
      method: 'POST',
      url: cmaURL + '/v1/promotion/voucher/valid-promo',
      failOnStatusCode: false,
      headers: header,
      body: {
        platform: data.platform,
        data: {
          region_id: String(voucherNonActive.region.id + 1),
          address_id: '1',
          redeem_code: voucherNonActive.redeem_code,
          total_price: faker.datatype.number({ min: 10000, max: 20000 }),
          total_charge: faker.datatype.number({ min: 10000, max: 20000 }),
          voucher_items: [
            {
              item_id: '1',
              order_qty: faker.datatype.number({ min: 10, max: 20 }),
            },
          ],
        },
      },
    }).should((response) => {
      expect(response.status).to.be.equal(422)
      expect(response.body.errors.redeem_code).to.be.equal('Voucher tidak berlaku untuk area')
    })
  })
 
})
