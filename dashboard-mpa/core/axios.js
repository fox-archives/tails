import axios from 'axios'

const operatorRequest = axios.create({
  baseURL: 'http://operator:3020'
})

export { operatorRequest as operatorReq }
