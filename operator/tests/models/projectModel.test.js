import _ from 'lodash'
import mongoose from 'mongoose'

import { 
  connectDb,
  fillDb,
  clearDb,
  closeDb
 } from './dbHandler'
import Project from '../../models/projectModel'
import { newProjects } from '../fixtures/projects'

mongoose.Promise = globalThis.Promise
mongoose.set('debug', false)

beforeAll(async () => await connectDb())
beforeEach(async () => await fillDb())
afterEach(async () => await clearDb())
afterAll(async () => await closeDb())


describe('project', () => {

  test('filler', () => {
    expect(() => {}).not.toThrow()
  })
  
//   test('can get projects without throwing', async () => {
//     const gettingProjects = async () => await Project.getProjects()

//     expect(gettingProjects)
//       .not
//       .toThrow()
//   })

//   test('can create project without throwing', async () => {
//     const creatingProjects = async () => await Project.createProject(
//       newProjects(1)[0]
//     )

//     expect(creatingProjects)
//       .not
//       .toThrow()
//   })

//   // ensure stuff like _id and __ver are not returned
//   test('project only has specific properties exposed', async () => {
//     const project = await Project.findOne({
//       name: 'fake-project-0'
//     })
//       .select('-__v')
    
//     // const project2 = _.clone(project)
//     // _.unset(project2, '_id')
//     const { desc, name, slug, type } = project
//     const project2 = { desc, name, slug, type }

//     expect(project2).toMatchObject({
//       name: 'fake-project-0',
//       type: 'web',
//       desc: 'fake-project-0-desc',
//       slug: 'fake-project-0'
//     })
//   })
})
