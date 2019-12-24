import fetch from 'node-fetch'
import http from 'http-status-codes'

const url = uri => new URL(uri, 'http://localhost:3020')

describe('/api/project/list endpoint', () => {
  const uri = '/api/project/list'

  test('success and returned proper headers', async () => {
    const res = await fetch(url(uri))

    expect(res.status).toBe(http.OK)
    expect(res.headers.get('Content-Type')).toBe(
      'application/json; charset=utf-8'
    )
  })

  test('success and returned proper object', async () => {
    const res = await fetch(url(uri))
    const json = await res.json()

    expect(json).toHaveProperty('projects')
  })
})

describe('/api/project/view endpoint', () => {
  const uri = '/api/project/view'

  test('success and returned proper headers', async () => {
    const res = await fetch(url(`${uri}?project=css-test`))

    expect(res.status).toBe(200)
  })

  test('success and returned proper body', async () => {
    const res = await fetch(url(`${uri}?project=css-test`))
    const json = await res.json()

    ;[
      'name',
      'type',
      'desc',
      'slug',
      'id',
      'firstCreated',
      'lastUpdated'
    ].forEach(prop => {
      expect(json).toHaveProperty(prop)
    })
    ;['_id', '__v'].forEach(prop => {
      expect(json).not.toHaveProperty(prop)
    })
  })
})

describe('/api/project/create endpoint', () => {
  const uri = '/api/project/create'

  test('success and returned property body', async () => {
    const res = await fetch(url(uri), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'html-test',
        type: 'web'
      })
    })
    const json = await res.json()

    ;[
      'name',
      'type',
      'desc',
      'slug',
      'id',
      'firstCreated',
      'lastUpdated'
    ].forEach(prop => {
      expect(json).toHaveProperty(prop)
    })
  })

  test('fail without proper details', async () => {
    const res = await fetch(url(uri), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const json = await res.json()

    expect(json).toHaveProperty('error')
  })
})

describe('/api/project/edit endpoint', () => {
  const uri = '/api/project/edit'

  test('edit that crap', async () => {
    const res2 = await fetch(url('/api/project/create'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'test-to-be-edited',
        type: 'web'
      })
    })
    const json2 = res2.json()

    const res = await fetch(url(uri), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: json2.id,
        name: 'name-edited',
        type: 'node'
      })
    })
    const json = await res.json()

    ;[
      'name',
      'type',
      'desc',
      'slug',
      'id',
      'firstCreated',
      'lastUpdated'
    ].forEach(prop => {
      expect(json).toHaveProperty(prop)
    })
  })
})
