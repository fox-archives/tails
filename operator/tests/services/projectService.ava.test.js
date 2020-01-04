import test from 'ava'

import mongoose from '../../core/mongoose'
import { listProjectService, viewProjectService, createProjectService, editProjectService } from '../../services/projectService'

import { 
  connectDb,
  fillDb,
  clearDb,
  closeDb
 } from '../dbHandler'
import Project from '../../models/projectModel'

test.before('start server', async t => {
  await connectDb()
})

test.after.always('cleanup', async t => {
  await closeDb()
})

test('list user', async t => {
  await Project.getProjects()
  const projects = await listProjectService()
  console.log(projects)
  t.pass()
})
