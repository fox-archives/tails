import mongoose from 'mongoose'

mongoose.set('debug', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('strict', true) // default

mongoose.Promise = globalThis.Promise

export default mongoose
