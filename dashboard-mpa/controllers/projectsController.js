import { nats } from '../core/nats'
import { operatorReq } from '../core/fetch'

export async function projectsController(req, res, next) {
  try {
    nats.request('tails.project.list', {
      specversion: '1.0',
      type: 'tails.project.list',
      source: 'dashboard-mpa',
      id: 'actualid',
      time: 'actualtime'
    }, natsres => {

      res.render('pages/projects', {
        hero: {
          header: 'welcome to tails',
          body: "let's get started"
        },
        projects: natsres.projects
      })
    })
  } catch (err) {
    console.error(err)
    next(new Error('failed to get projects'))
  }
}

export function createProjectControllerGet(req, res) {
  res.render('forms/createProjectForm', {
    hero: {
      header: 'create new project'
    }
  })
}

export async function createProjectControllerPost(req, res) {
  const { name, type } = req.body

  if (!name) throw new Error('foo')
  if (!type) throw new Error('bar')

  const project = await operatorReq.post('/api/project/create', {
    body: JSON.stringify({
      name,
      type
    })
  })

  res.json(project)
}

export async function editProjectControllerGet(req, res) {
  const { project: projectName } = req.query

  const { project } = await operatorReq.get(
    `/api/project/view?project=${projectName}`
  )

  res.render('forms/editProjectForm', {
    hero: {
      header: 'edit existing project',
      body: `edit the ${projectName} project`
    },
    project
  })
}

export function editProjectControllerPost(req, res) {
  // process the post request by calling service that makes request to subsequent microservice
}
