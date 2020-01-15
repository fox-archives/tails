import { nats } from './core/nats'

// subscribe to all events and log to the console
nats.subscribe('>', value => {
  console.log('SUB', value);
  return value;
})

// setInterval(() => {
//  try {
//    nats.request('debug.test', { 'version': 1, 'isDebug': true })
//  } catch (err) {
//    console.error('err', err)
//  }
// }, 500)
