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

projectSchema.methods.print = function() {
  console.log(this.name ? this.name : 'name not found')
}

// projectSchema.static('getProjects', () => {})
projectSchema.statics.getProjects = function() {
  return new Promise((resolve, reject) => {
    this.find({
      name: /^project/
    }, (err, projects) => {
      if (err) reject(err)
      resolve(projects)
    })
  })
}

export default mongoose.model('Project', projectSchema)
