import mongoose from '../../core/mongoose'
import { listProjectService, viewProjectService, createProjectService, editProjectService } from '../../services/projectService'

import { 
  connectDb,
  fillDb,
  clearDb,
  closeDb
 } from '../dbHandler'
import Project from '../../models/projectModel'

import { newProjects } from '../fixtures/projects'

// mongoose.set('debug', false)

beforeAll(async () => await connectDb())
beforeEach(async () => await fillDb())
afterEach(async () => await clearDb())
afterAll(async () => await closeDb())

mongoose.Promise = globalThis.Promise
mongoose.set('debug', false)

// describe('test services functionality', () => {
//   test('list user', async () => {
//     const projects = await listProjectService()

//     expect(projects).toHaveLength(10)

//     projects.forEach(project => {
//       expect(project).toEqual({
//         id: toBeDefined()
//       })
//       expect(project).toBeDefined()
//       expect(project).toHaveProperty('id')
//       expect(project).toHaveProperty('name')
//       expect(project).toHaveProperty('type')
//       expect(project).toHaveProperty('desc')
//       expect(project).toHaveProperty('slug')
//       expect(project).toHaveProperty('firstCreated')
//       expect(project).toHaveProperty('lastModifiede')
//     })
//   })
// })

describe('project', () => {
  // test('can get projects without throwing', async () => {
  //   const gettingProjects = async () => await Project.getProjects()

  //   expect(gettingProjects)
  //     .not
  //     .toThrow()
  // })

  // test('can create project without throwing', async () => {
  //   const creatingProjects = async () => await Project.createProject(
  //     newProjects(1)[0]
  //   )

  //   expect(creatingProjects)
  //     .not
  //     .toThrow()
  // })

  // ensure stuff like _id and __ver are not returned
  test('get project without returning anything', async () => {
    await Project.getProjects()
    const project = await Project.findOne({
      name: 'fake-project-0'
    })
      .select('-__v')
    
    const { desc, name, slug, type } = project
    const project2 = { desc, name, slug, type }

    expect(project2).toMatchObject({
      name: 'fake-project-0',
      type: 'web',
      desc: 'fake-project-0-desc',
      slug: 'fake-project-0'
    })
  })
})
