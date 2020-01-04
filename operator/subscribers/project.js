import { v4 as uuid } from 'uuid'

import { nats } from '../core/nats'
import Project from '../models/projectModel'
import { listProjectService, viewProjectService, createProjectService, editProjectService } from '../services/projectService'
import { launchCode } from '../services/code'
import { validateCodePath } from '../validations/validateCodePath'

nats.subscribe('project', async (req, replyTo) => {
  if (req.action === 'list') {
    try {
      let projects = await listProjectService()

      nats.publish(replyTo, {
        projects
      })
    } catch (err) {
      console.error(err)
    }
  } else if (req.action === 'view') {
      try {
        const project = await viewProjectService(req)

        nats.publish(replyTo, {
          project
        })
      } catch (err) {
        console.error(err)
      }
  } else if (req.action === 'create') {
    try {
      const project = req.project
      project.id = uuid()
      project.desc = 'l'
      project.slug = toSlug(project.name)

      await createProjectService()

      nats.publish(replyTo, {
        status: 'done'
      })
    } catch (err) {
      console.error(err)
    }
  } else if (req.action === 'edit') {
    try {
      const newProject = await editProjectService()

      nats.publish(replyTo, {
        status: 'done'
      })
    } catch (err) {
      console.error(err)
    }
  } else if (req.action === 'delete') {
    try {

    } catch (err) {
      console.error(err)
    }
  } else if (req.action === 'open') {
    try {
      await validateCodePath()
      await launchCode()

      nats.publish(replyTo, {
        status: 'done'
      })
    } catch (err) {
      console.error(err)
    }
  }
})
