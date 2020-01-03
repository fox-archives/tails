import { nats } from '../core/nats'
import Project from '../models/projectModel'

nats.subscribe('project', async (req, replyTo) => {
  if (req.action !== 'list') return

  try {
    let projects = await Project.getProjects()

    nats.publish(replyTo, {
      projects
    })
  } catch (err) {
    console.error(err)
  }
})
