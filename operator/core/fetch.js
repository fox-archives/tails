import fetch from 'node-fetch'

const n = url => new URL(url, 'http://storage:3040')
const warn = () => console.error('PASSED METHOD PROP TO REQUEST FUNCTION IS OVERRIDDEN')

const storageRequest = {
  get(url, opts = {}) {
    if (opts.method) warn()
    return fetch(n(url), { ...opts, method: 'GET' }).then(res => res.json())
  },
  post(url, opts = {}) {
    if (opts.method) warn()
    return fetch(n(url), { ...opts, method: 'POST' }).then(res => res.json())
  }
}

export { storageRequest as storageReq }
