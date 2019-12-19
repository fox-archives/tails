import _ from 'lodash'
import Project from '../models/projectModel'

export function dbSeed(mongoose) {
  console.info('seeding database')

  mongoose.connection.collections['projects'].drop(err => {
    if (err) return console.trace(err)

    console.info('projects collection nuked')
  })
  _.times(3, n => {
    const project = new Project({
      name: 'project-' + n,
      type: 'web',
      desc: 'project-desc-' + n,
      slug: 'project-' + n
    })

    project.save((err, project) => {
      if (err) return console.trace(err)
    })
  })
}
