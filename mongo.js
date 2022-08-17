const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.adcuo.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url).then(_ => console.log('Connected to mongoDB'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
/*
    mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: '',
      number: ''
    })

    return person.save()
  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
  */