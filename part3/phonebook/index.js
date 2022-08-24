/* eslint-disable no-unused-vars */
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

morgan.token("persons", (req, res) => {
  return JSON.stringify(persons)
})

const app = express()

app.use(express.json())
app.use(
  morgan((tokens, req, res) => {
    return tokens.method(req, res) === "POST"
      ? [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"), "-",
          tokens["response-time"](req, res), "ms",
          tokens.persons(req, res),
        ].join(" ")
      : [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"), "-",
          tokens["response-time"](req, res), "ms",
        ].join(" ")
  })
)
app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    ${new Date()}
  `
  )
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)
  if (!person) {
    res.status(404).end()
    return
  }
  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "content missing",
    })
  }

  const newName = req.body.name
  const currNames = persons.map((p) => {
    return p.name
  })

  if (currNames.includes(newName)) {
    return res.status(400).json({
      error: "name must be unique",
    })
  }

  const newPerson = { id: getRandomInt(99), name: newName, number: req.body.number }
  persons = persons.concat(newPerson)
  res.send(newPerson).status(204).end()
})

app.get('*', (req, res) => {
  res.send("PLEASE PLEASE PLEASE")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log("is this running at all?")
})