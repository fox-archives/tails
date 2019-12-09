import mongoose from 'mongoose'

export function initMongo() {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = mongoose.connection

  db.on('error', err => {
    console.error('connection error', err)
  })

  db.once('open', () => {
    console.log('connected')

    var kittySchema = new mongoose.Schema({
      name: String
    })

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function() {
      var greeting = this.name
        ? 'Meow name is ' + this.name
        : "I don't have a name"
      console.log(greeting)
    }

    var Kitten = mongoose.model('Kitten', kittySchema)

    var fluffy = new Kitten({ name: 'fluffy' })
    fluffy.speak() // "Meow name is fluffy"

     fluffy.save(function(err, fluffy) {
       if (err) return console.error(err)
       fluffy.speak()
     })

     Kitten.find(function(err, kittens) {
       if (err) return console.error(err)
       console.log(kittens)
     })

     Kitten.find({ name: /^fluff/ }, (err, kittens) => {
      if (err) return console.error(err)
      console.log(kittens);
     })
  })
}
