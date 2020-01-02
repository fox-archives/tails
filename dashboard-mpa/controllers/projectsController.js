import { nats } from '../core/nats'
import { operatorReq } from '../core/fetch'

export async function projectsController(req, res, next) {
  nats.request('project', { action: 'create' }, res => {
    console.log('DONEFOR', res)
  })
  res.send('fo')
  // try {
  //   // nats.request(
  //   //   'project',
  //   //   {
  //   //     action: 'create'
  //   //   },
  //   //   { max: 1 },
  //   //   1000,
  //   //   res => {
  //   //     console.log('DONEFOR', res)
  //   //   }
  //   // )
    
  //   const { projects } = await operatorReq.get('/api/project/list')

  //   res.render('pages/projects', {
  //     hero: {
  //       header: 'welcome to tails',
  //       body: "let's get started"
  //     },
  //     projects: projects
  //   })
  // } catch (err) {
  //   console.error(err)
  //   next(new Error('failed to get projects'))
  // }
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
