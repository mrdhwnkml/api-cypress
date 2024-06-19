import signUpData from '../fixtures/data.json'

export default async function loadToken() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: signUpData.email,
      password: signUpData.password,
    }),
  })

  if (!res.ok) throw new Error(res.statusText)
  const response = await res.json()

  return response
}
