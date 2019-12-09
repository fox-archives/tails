import mongoose from '../core/mongoose'

export function initMongo() {
  console.log('ready state: ', mongoose.connection.readyState)

  // if mongoose is not connected
  let db
  if(mongoose.connection.readyState !== 1) {
    db = mongoose.createConnection(process.env.DB_URI)
  }
  
  // readyState 0
  db.on('disconnected', () => {
    console.log('mongoose connection disconnected')
  })

  // readyState 1
  db.on('connected', () => {
    console.log('mongoose connection connected')
  })

  // readyState 2
  db.on('connecting', () => {
    console.log('mongoose connection connecting')
  })

  // readyState 3
  db.on('disconnecting', () => {
    console.log('mongoose connection disconnecting')
  })

  db.on('error', err => {
    if(err.message.code === 'ETIMEDOUT') {
      console.warn('mongo connection timed out')
      setTimeout(() => {
        mongoose.createConnection(process.env.DB_URI)
      }, 1000)
    }
    console.error('connection error', err)
  })

  db.once('open', () => {
    console.log('connected')

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

    projectSchema.methods.print = function() {
      console.log(this.name ? this.name : 'name not found')
    }

    const Project = mongoose.model('Project', projectSchema)

    const project1 = new Project({
      name: 'project1',
      type: 'web',
      desc: 'project desc',
      slug: 'project-1'
    })

    project1.save((err, project) => {
      if (err) return console.error(err)
      project.print()
    })
    Project.find((err, projects) => {
      if (err) return console.error(err)
      console.log(projects)
    })
    Project.deleteOne({ name: 'project1' }, err => {
      if (err) console.error(err)
    })
  })

  return db
}
