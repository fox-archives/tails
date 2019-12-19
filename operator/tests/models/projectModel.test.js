import mongoose from 'mongoose'

import { 
  connectDb,
  fillDb,
  clearDb,
  closeDb
 } from './dbHandler'
import Project from '../../models/projectModel'

mongoose.Promise = globalThis.Promise
mongoose.set('debug', false)

beforeAll(async () => await connectDb())
beforeEach(async () => await fillDb())
afterEach(async () => await clearDb())
afterAll(async () => await closeDb())


describe('project', () => {
  it('can get projects without throwing', async () => {
    const gettingProjects = async () => await Project.getProjects()

    expect(gettingProjects)
      .not
      .toThrow()
  })

  it('can create project without throwing', async () => {
    const creatingProjects = async () => await Project.createProject({
      name: 'mock-1',
      type: 'web',
      desc: 'thing',
      slug: 'other'
    })

    expect(creatingProjects)
      .not
      .toThrow()
  })

})
