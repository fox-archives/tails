import { launchCode } from '../../services/code'
import { validateCodePath } from '../../validations/validateCodePath'

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
    ctx.body = 'failure'
  }
}

export function editProjectController(ctx) {}

export function deleteProjectController(ctx) {}

export async function openProjectController(ctx, next) {
  console.log(ctx.body)
  try {
    await validateCodePath()
    await launchCode()
    ctx.body = 'd'
  } catch (err) {
    throw new Error('openProjectController error launching code', err)
  }
}
