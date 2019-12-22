import {
  readProjects
} from '../services/readFs'

export async function readFsProjectController(ctx) {
  try {
    const projects = await readProjects()

    ctx.body = {
      projects
    }
  }
  catch (err) {
    ctx.status = 500
    ctx.body = {
      error: "error reading file system or storage mechanism"
    }
  }
 
}
