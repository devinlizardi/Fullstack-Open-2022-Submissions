/* eslint-disable no-unused-vars */
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./modules/persons")

// Morgan setup
morgan.token("persons", (req, res) => {
  Person.find({}).then((result) => {
    return JSON.stringify(result)
  })
})

// middleware setup
const app = express()
app.use(express.json())
app.use(
  morgan((tokens, req, res) => {
    return tokens.method(req, res) === "POST"
      ? [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
          tokens.persons(req, res),
        ].join(" ")
      : [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ].join(" ")
  })
)
app.use(cors())
app.use(express.static("build"))

// route handling
app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> ${new Date()}`)
  })
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(400).send("person already deleted").end()
        return
      }
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post("/api/persons/", (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.status(400).end()
    return
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  person.save()
  res.status(204).end()
})

app.put("/api/persons/:id", (req, res, next) => {
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true})
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((err) => next(err))
})

// error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}
app.use(errorHandler)

// run app
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
