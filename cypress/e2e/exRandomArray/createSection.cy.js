/// <reference types ='Cypress'/>
import { faker } from '@faker-js/faker'
import { loadToken } from '@Support/Auth'
import { listArchetype } from '@Utils/Customer_Relation/Archetype'
import { listActiveItem } from '@Utils/Catalog/Item'
import { listRegion } from '@Utils/Configuration/Region'

const dashUrl = Cypress.env('dasboard_url')
describe('Create item section', () => {
  let accessToken
  let ItemSectionName
  let ItemSectionstart_at
  let ItemSectionfinish_at
  let sectionID
  let archetypeId = []
  let regionId = []
  let itemId = []

  before(async () => {
    const response = await loadToken()
    accessToken = response.data.token
    const responselistArchetype = await listArchetype(accessToken)
    //Random Array, dari list Archetype
    for (let i = 0; i < Math.round(Math.random() * (8 - 5)) + 5; i++) {
      archetypeId.push(responselistArchetype.data[i].id)
    }
    const responseListActiveItem = await listActiveItem(accessToken)
    for (let i = 0; i < Math.round(Math.random() * (8 - 5)) + 5; i++) {
      itemId.push(responseListActiveItem.data[i].id)
    }
    const responseListRegion = await listRegion(accessToken)
    for (let i = 0; i < Math.round(Math.random() * (8 - 5)) + 5; i++) {
      regionId.push(responseListRegion.data[i].id)
    }
    //Random 1 id region
    const responseList = await listadmDivision(accessTokenGP)
    regionID = responseList.data[faker.random.numeric(1)].region
  })

  it('Create item section with valid data should be success', () => {
    cy.api({
      method: 'POST',
      url: 'endpoint',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: {
        name: 'Item Section ' + faker.random.numeric(5),
        sequence: faker.datatype.number({ min: 1, max: 5 }),
        regions: regionId,
        //Akan kan random array
        archetypes: archetypeId,
        items: itemId,
        start_at: faker.date.soon(10),
        finish_at: faker.date.future(1),
        background_image: faker.image.animals(),
        type: 1,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.have.property('status', 'success')
      sectionID = response.body.data.id
      ItemSectionName = response.body.data.name
      ItemSectionstart_at = response.body.data.start_at
      ItemSectionfinish_at = response.body.data.finish_at
    })
  })
})
