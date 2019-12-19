import mongoose from './mongoose'
import { dbSeed } from './dbSeed'

export function initDb() {
  // if mongoose is not connected
  if (mongoose.connection.readyState !== 1) {
    mongoose.connect(process.env.DB_URI, err => {
      if (err) return console.trace(err)
      console.info('connection succeeded')
      
      dbSeed(mongoose)
    })
  }
}
