import NATS from 'nats'

const nats = NATS.connect({
  url: 'nats://nats:4222',
  json: true
})

export { nats }
