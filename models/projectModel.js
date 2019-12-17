import _ from 'lodash'

import mongoose from '../core/mongoose'

const projectSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true
  // },
  name: {
    type: String,
    trim: true, // custom setter
    lowercase: true, // custom setter
    minLength: 2, // validator
    required: true // validator
  },
  type: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2,
    required: true
  },
  desc: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2,
    required: true
  }
}, {
  id: false,
  minimize: false,
  strictQuery: true
})

// projectSchema.pre('save', async function save(next) {
//   next()
// })

// projectSchema.virtual('fullThing').get(() => {
//   return this.name.first + ' ' + this.name.last
// })

projectSchema.statics.createProject = function(newProject) {
  return new Promise((resolve, reject) => {
    const Project = mongoose.model('Project')
    const project = new Project(newProject)
    
    project.save((err, project) => {
      if (err) reject(err)

      resolve(project)
    })
  })
}

projectSchema.statics.getProjects = function() {
  return new Promise((resolve, reject) => {
    this.find((err, projects) => {
      if (err) reject(err)

      resolve(projects)
    })
  })
}

export default mongoose.model('Project', projectSchema)
