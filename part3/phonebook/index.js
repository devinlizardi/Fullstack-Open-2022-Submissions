/* eslint-disable no-unused-vars */
const express = require("express")

const app = express()
app.use(express.json())

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

  console.log("Deleted: ", persons)

  res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const newName = req.body.name
  persons.forEach(p => {
    console.log(p)
    if (p.name === newName) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  })

  const newPerson = { id: getRandomInt(99), name: newName, number: req.body.number }
  persons = persons.concat(newPerson)

  res.send(newPerson).status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
