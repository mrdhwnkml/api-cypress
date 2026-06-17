import signUpData from '../fixtures/data.json'

const credentials = [
  { username: signUpData.email, password: signUpData.password },
  { username: 'jsmith', password: 'demo1234' },
  { username: "admin' --", password: 'a'
  }
]

export function loadToken(index = 0) {
  const cred = credentials[index]

  if (!cred) {
    throw new Error('Semua credential gagal login')
  }

  return cy
    .request({
      method: 'POST',
      url: '/api/login',
      failOnStatusCode: false,
      body: {
        username: cred.username,
        password: cred.password,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.body.Authorization
      }
      return loadToken(index + 1)
    })
}
