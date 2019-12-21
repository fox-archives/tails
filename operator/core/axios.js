import axios from 'axios'

const storageRequest = axios.create({
  baseURL: 'http://storage:3040'
})

export { storageRequest as storageReq }
