import Project from '../models/projectModel'
export async function projectsController(req, res) {
  try {
    const projects = await Project.getProjects()

    res.render('pages/projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects
    })
  } catch {
    res.render('pages/error', {
      error: {
        header: 'there was an error',
        body: 'thing'
      }
    })
  }
}

export function createProjectController(req, res) {
  res.render('forms/createProjectForm', {
    hero: {
      header: 'create new project'
    }
  })
}

export function editProjectController(req, res) {
  const { project } = req.query

  res.render('forms/editProjectForm', {
    hero: {
      header: 'edit existing project',
      body: `edit the ${project} project`
    }
  })
}
