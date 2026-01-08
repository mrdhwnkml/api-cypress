export const listArchetype = (token) => {
  return cy.api({
    method: 'GET',
    url: '/archetype',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
