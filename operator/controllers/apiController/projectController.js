import _ from 'lodash'

import Project from '../../models/projectModel'
import { launchCode } from '../../services/code'
import { validateCodePath } from '../../validations/validateCodePath'

export async function listProjectController(ctx) {
  try {
    let projects = await Project.getProjects()
    
    ctx.body = {
      data: { projects }
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

  if(!projectName) {
    ctx.status = 500
    ctx.body = {
      error: 'must add `project` query parameter'
    }
    return
  }

  try {
    const { name, type, desc, slug } = await Project.getProject(projectName)

    ctx.body = {
      project: { name, type, desc, slug }
    }
  } catch (err) {
    console.error(err)

    ctx.status = 500
    ctx.body = {
      error: err
    }
  }
}

export async function createProjectController(ctx) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body

  try {
    await Project.createProject({
      name: projectName,
      type: projectType,
      desc: projectDesc,
      slug: projectSlug
    })

    ctx.body = 'success'
  } catch {
    console.error(err)
    
    ctx.status = 500
    ctx.body = {
      error: err
    }
  }
}

export function editProjectController(ctx) {
  ctx.status = 501
}

export function deleteProjectController(ctx) {
  ctx.status = 501
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
