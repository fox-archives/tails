import _ from 'lodash'
import { v4 as uuid } from 'uuid'

import { storageReq } from './fetch'
import Project from '../models/projectModel'

export function dbSeed(mongoose) {
  console.info('seeding database')

  // use 'test' database and nuke all collections
  mongoose.connection.useDb('test')
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) return console.trace(err)

    collections = collections.map(collection => collection.name)
    collections.forEach(collection => {
      mongoose.connection.collections[collection].drop(err => {
        if (err) return console.trace(err)

        console.info(`${collection} collection nuked`)
      })
    })
  })


  storageReq
    .get('/api/projects/read')
    .then(res => {
      const projects = res.projects

      projects.forEach(projectName => {
        const project = new Project({
          id: uuid(),
          name: projectName,
          type: 'web',
          desc: `${projectName} description`,
          slug: projectName,
          firstCreated: Date.now(),
          lastUpdated: Date.now()
        })

        project.save((err, proj) => {
          if (err) return console.trace(err)
        })
      })
    })
    .catch(err => {
      console.trace(err)
    })
}
