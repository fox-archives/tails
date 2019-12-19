// import Project from '../models/projectModel'

export async function projectsController(req, res, next) {
  try {
    // const projects = await Project.getProjects()
    const projects = await axios.get(`${process.env.MANAGER_URI}`)
    res.render('pages/projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects
    })
  } catch {
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

export function createProjectControllerPost(req, res) {
  // process the post request by calling service that makes request to subsequent microservice
}

export function editProjectControllerGet(req, res) {
  const { project } = req.query

  res.render('forms/editProjectForm', {
    hero: {
      header: 'edit existing project',
      body: `edit the ${project} project`
    }
  })
}

export function editProjectControllerPost(req, res) {
  // process the post request by calling service that makes request to subsequent microservice
}
