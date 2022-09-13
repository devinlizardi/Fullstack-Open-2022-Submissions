/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI

mongoose
  .connect(uri)
  .then((res) => {
    console.log("connected to MongoDB")
  })
  .catch((err) => {
    console.log("error connecting: ", err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)