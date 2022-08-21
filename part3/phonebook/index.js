/* eslint-disable no-unused-vars */
const express = require("express")

const app = express()
app.use(express.json)

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

app.get("/info", (req, res) => {
  console.log("hello")
  res.send(
  `<p>Phonebook has info for ${persons.length} people</p>
    ${new Date()}
  `)
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) {
    res.status(404).end()
    return
  }
  res.json(person)
})

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id)
//   persons = persons.filter(p => p.id !== id)

//   console.log(persons)

//   res.status(204).end()
// })

// app.post("api/persons/:id", (req, res) => {
//   console.log("posty")
  
//   const id = Number(req.params.id)
//   console.log(req.params.id === id ? "true" : "false");

//   res.status(204).end()
// })

app.get('*', (err, req, res, next) => {
  console.log('no way')
  res.send("done")
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  // console.log(persons)
})
