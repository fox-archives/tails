import fetch from 'node-fetch'

const n = url => new URL(url, 'http://operator:3020')
const warn = () =>
  console.error('PASSED METHOD PROP TO REQUEST FUNCTION IS OVERRIDDEN')

const operatorRequest = {
  get(url, opts = {}) {
    if (opts.method) warn()
    return fetch(n(url), { ...opts, method: 'POST' }).then(res => res.json())
  },
  post(url, opts = {}) {
    if (opts.method) warn()
    return fetch(n(url), { ...opts, method: 'POST' }).then(res => res.json())
  }
}

export { operatorRequest as operatorReq }
