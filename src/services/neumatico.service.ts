import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}/neumaticos`

export const neumaticoService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  updateStock,
  getStock,
}

const requestOptions = {
  method: 'X',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

async function getAll() {
  try {
    requestOptions.method = 'GET'
    const response = await fetch(baseUrl, requestOptions)

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
    return []
  }
}

async function getById(id) {
  try {
    requestOptions.method = 'GET'
    const response = await fetch(`${baseUrl}/${id}`, requestOptions)

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }

    const result = await response.json()

    return result
  } catch (err) {
    console.log(err)
    return null
  }
}

function create(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  console.log('request::: ' + JSON.stringify(data))
  return fetch(baseUrl, requestOptions).then(handleResponse)
}

function update(id, data) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return fetch(`${baseUrl}/${id}`, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    // headers: authHeader(url),
  }
  return fetch(`${baseUrl}/${id}`, requestOptions).then(handleResponse)
}

async function updateStock(id, quantity) {
  try {
    requestOptions.method = 'PUT'
    const response = await fetch(
      `${baseUrl}/${id}/stock?quantity=${quantity}`,
      requestOptions
    )

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()

    return result
  } catch (err) {
    console.log(err)
    return null
  }
}

async function getStock(estado) {
  try {
    requestOptions.method = 'GET'
    const response = await fetch(
      `${baseUrl}/stock?estado=${estado}`,
      requestOptions
    )

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
    return []
  }
}

function handleResponse(response) {
  if (!response.ok) {
    const error = response.statusText
    console.log('Reponse::: ' + response.status)
    // return Promise.reject(error)
    return error
  }
  return response
}
