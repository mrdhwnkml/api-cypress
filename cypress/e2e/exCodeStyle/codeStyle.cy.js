import data from '../../fixtures/data.json'
import { faker } from '@faker-js/faker'

const cmaURL = Cypress.env('mobile_url')
import { loadTokenCustomerApps, loadTokenDashboard } from '@Support/Auth'
import { createVoucher, getActiveVoucher } from ''

describe.skip('Apply Voucher on Mobile', async () => {
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

  it.skip('Apply Voucher Type Total Discount with Active Redeem Code should success', () => {
    cy.api({
      method: 'POST',
      url: 'endpoint',
      failOnStatusCode: false,
      headers: header,
      body: {
        platform: data.platform,
        data: {
          region_id: String(voucherNonActive.region.id),
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
})
