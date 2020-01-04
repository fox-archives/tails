import { v4 as uuid } from 'uuid'

import { nats } from '../core/nats'
import { launchCode } from '../services/code'

nats.subscribe('project', async (req, replyTo) => {
  if (req.action === 'list') {
    try {
      

      nats.publish(replyTo, {
        projects
      })
    } catch (err) {
      console.error(err)
    }
  }
})
