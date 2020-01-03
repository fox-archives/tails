import { nats } from '../core/nats'
import Project from '../models/projectModel'

nats.subscribe('project', async (req, replyTo) => {
  console.log(req.action, 'FOO')
  if (req.action !== 'list') return

  try {
    let projects = await Project.getProjects()
    console.log('FOOO', projects)
    nats.publish(replyTo, {
      projects
    })
  } catch (err) {
    console.error(err)
  }
})
