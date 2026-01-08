export const createVoucher = (token) => {
  return cy.api({
    method: 'POST',
    url: '/voucher',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getActiveVoucher = (header, data) => {
  return cy.api({
    method: 'GET',
    url: '/voucher/active',
    headers: header,
  })
}
