import {
  readProjects
} from '../services/readFs'

export async function readFsProjectController(ctx) {
  const projects = await readProjects()

  ctx.body = {
    data: { projects }
  }
}
