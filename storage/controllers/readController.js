import {
  readProjects
} from '../services/readFs'

export async function readFsProjectController(ctx) {
  try {
    const projects = await readProjects()

    ctx.body = {
      data: { projects }
    }
  }
  catch (err) {
    ctx.body = {
      error: { err }
    }
  }
 
}
