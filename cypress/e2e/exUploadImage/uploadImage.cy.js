/// <reference types="Cypress" />

import { faker } from '@faker-js/faker'
import { loadTokenKurirApps } from '@Support/Auth'
const pic = '../fixtures/gambar.png'
const deliveryEvidenceType = 'delivery_evidence'
const transactionEvidenceType = 'transaction_evidence'
const postponeEvidenceType = 'postpone_evidence'
const uploadImage_url = Cypress.env('uploadImage_url')
let accessToken

describe('upload image kurir apps', async () => {
  before(async () => {
    const response = await loadTokenKurirApps()
    accessToken = response.data.token
  })

  it.skip('upload image evidence delivery should be success', () => {
    cy.fixture('gambar.png', 'binary').then((fileContent) => {
      const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/png')
      const formData = new FormData()

      formData.append('file', blob, 'gambar.png')
      formData.append('type', deliveryEvidenceType)

      cy.request({
        method: 'POST',
        url: 'endpoint',
        failOnStatusCode: false,
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
        responseType: 'json',
      }).then((response) => {
        const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body)
        const body = JSON.parse(bodyString)
        expect(body.code).to.eq(200)
        expect(body.data.url).to.not.be.null
      })
    })
  })
})
