export const listRegion = (token) => {
  return cy.api({
    method: 'GET',
    url: '/region',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
