import _ from 'lodash'
import { v4 as uuid } from 'uuid'

import Project from '../../models/projectModel'
import { launchCode } from '../../services/code'
import { validateCodePath } from '../../validations/validateCodePath'
import { toSlug } from '../../util/string'
import { listProjectService } from '../../services/projectService'

// prevent _id, __v, or other hidden properties from being exposed
const pickProjectProperties = project =>
  _.pick(project, [
    'id',
    'name',
    'type',
    'desc',
    'slug',
    'firstCreated',
    'lastAccessed',
    'lastUpdated'
  ])

export async function listProjectController(ctx) {
  try {
    let projects = await listProjectService()

    ctx.body = {
      projects
    }
  } catch (err) {
    console.log(err)

    ctx.status = 500
    ctx.body = {
      error: err
    }
  }
}

export async function viewProjectController(ctx) {
  const projectName = ctx.query.project

  if (!projectName) {
    ctx.status = 500
    ctx.body = {
      error: "must add 'project' query parameter"
    }
    return
  }

  try {
    const obj = await Project.getProject(projectName)
    const project = pickProjectProperties(obj)

    ctx.body = {
      ...project
    }
  } catch (err) {
    console.error(err)

    ctx.status = 500
    ctx.body = {
      error: 'your db request could not be fulfilled'
    }
  }
}

export async function createProjectController(ctx) {
  const project = pickProjectProperties(ctx.request.body)
  try {
    if (!project.name) throw new Error('did not indicate project name')
    if (!project.type) throw new Error('did not indicate project type')
    if (project.firstCreated) throw new Error('do not add a project firstCreated')
    if (project.lastUpdated) throw new Error('do not add a project lastUpdated')
    if (!project.id) project.id = uuid()
    if (!project.desc) project.desc = 'l'
    if (!project.slug) project.slug = toSlug(project.name)
    project.firstCreated = Date.now()
    project.lastUpdated = Date.now()

    await Project.createProject(project)

    ctx.body = {
      ...project
    }
  } catch (err) {
    console.error(err)

    ctx.status = 500
    ctx.body = {
      error: err.message
    }
  }
}

export async function editProjectController(ctx) {
  const project = pickProjectProperties(ctx.request.body)

  console.log(project)
  const { id } = project

  try {
    const actualProject = await Project.findOneAndUpdate({ id }, project, {
      new: true,
      returnOriginal: true
    }, (err, project) => {
      if (err) console.error(err)

      console.log('lll', project)
      ctx.body = {
        ...project
      }
    })
    console.log(actualProject)

    ctx.body = {
      ...actualProject
    }
  } catch (err) {
    console.error(err)

    ctx.status = 500
    ctx.body = {
      error: 'error when editing project'
    }
  }
 
}

export function deleteProjectController(ctx) {
  ctx.status = 401
}

export async function openProjectController(ctx, next) {
  ctx.status = 501
  console.log(ctx.body)
  try {
    await validateCodePath()
    await launchCode()
    ctx.body = 'd'
  } catch (err) {
    throw new Error('openProjectController error launching code', err)
  }
}
