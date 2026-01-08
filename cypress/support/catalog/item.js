export const listActiveItem = (token) => {
  return cy.api({
    method: 'GET',
    url: '/item/active',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
