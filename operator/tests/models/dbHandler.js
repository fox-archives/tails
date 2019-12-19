import _ from 'lodash'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import Project from '../../models/projectModel'

const mongod = new MongoMemoryServer()

export async function connectDb() {
  const uri = await mongod.getConnectionString()
  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export async function fillDb() {
  _.times(10, n => Project.createProject({
    name: `fake-project-${n}`,
    type: 'web',
    desc: `fake-project-${n}-desc`,
    slug: `fake-project-${n}`
  }))
}

export async function clearDb() {
  await mongoose.connection.collections.projects.deleteMany()
}

export async function closeDb() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}
