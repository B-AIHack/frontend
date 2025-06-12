import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

export const request = axios.create({
  baseURL: '/api'
})

// MOCKS (temp)

const mock = new AxiosMockAdapter(request, { delayResponse: 300 })

mock.onGet('/api/users').reply(200, {
  users: [{ id: 1, name: 'John Smith' }]
})

mock.onPost('/api/users').reply(200)
