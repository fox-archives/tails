import _ from 'lodash'

import { storageReq } from './axios'
import Project from '../models/projectModel'

export function dbSeed(mongoose) {
  console.info('seeding database')

  mongoose.connection.collections['projects'].drop(err => {
    if (err) return console.trace(err)

    console.info('projects collection nuked')
  })

  storageReq
    .get('/api/projects/read')
    .then(res => {
      const projects = res.data.data.projects

      projects.forEach(projectName => {
        const project = new Project({
          name: projectName,
          type: 'web',
          desc: `${projectName} description`,
          slug: projectName
        })

        project.save((err, proj) => {
          if (err) return console.trace(err)
        })
      })
    })
    .catch(err => {
      console.error(err)
    })
}
