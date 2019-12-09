import mongoose from '../core/mongoose'

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2
  },
  type: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2
  },
  desc: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2
  }
})

const Project = mongoose.model('Project', projectSchema)

export default Project
