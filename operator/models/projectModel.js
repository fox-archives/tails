import mongoose from '../core/mongoose'

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    name: {
      type: String,
      trim: true, // custom setter
      lowercase: true, // custom setter
      required: true // validator
    },
    type: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    desc: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    firstCreated: {
      type: Number,
      min: 0,
      required: true
    },
    lastUpdated: {
      type: Number,
      min: 0,
      required: true
    }
  },
  {
    id: false, // does not create id getter for documents _id field
    minimize: false, // does not minimize schemas, writing empty objects
    strictQuery: true // enables strict mode for filter parameter to queries
  }
)

projectSchema.statics.listProjects = function() {
  return new Promise((resolve, reject) => {
    this.find((err, projects) => {
      if (err) reject(err)

      resolve(projects)
    })
  })
}
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

      console.error(projects)
      resolve(projects)
    })
  })
}

projectSchema.statics.getProject = function(projectName) {
  return new Promise((resolve, reject) => {
    this.findOne({ name: projectName }, (err, project) => {
      if (err) reject(err)

      resolve(project)
    })
  })
}

export default mongoose.model('Project', projectSchema)
