const mongoose = require("mongoose")

let isAddingPerson = false
let personName
let personNumber

if (process.argv.length < 3) {
  console.log("Please provide the password: node mongo.js <password>")
  process.exit(1)
} else if (process.argv.length == 5) {
  isAddingPerson = true
  personName = process.argv[3]
  personNumber = process.argv[4]
}

const password = process.argv[2]

const uri = `mongodb+srv://devinlizardi:${password}@cluster0.yngtleu.mongodb.net/persons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model("Person", personSchema)

mongoose
  .connect(uri)
  .then(() => {
    if (isAddingPerson) {
      console.log(`added ${personName} number ${personNumber} to phonebook`)
      const person = new Person({
        name: personName,
        number: personNumber,
        id: 0,
      })
      return person.save()
    }
  })
  .then(() => {
    if (!isAddingPerson) {
      console.log("phonebook:")
      Person
        .find({})
        .then(res => {
          res.forEach(p => {
            console.log(`${p.name} ${p.number}`)
          })
          mongoose.connection.close()
        })
    }
  })
  .then(() => {
    console.log("manual close")
    return mongoose.connection.close()
  })
  .catch((err) => {
    console.log(err)
  })
