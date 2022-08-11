import { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import NumberDisplay from "./components/NumberDisplay"
import personService from "./services/persons"

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const isRepeat = persons.filter(p => p.name === newName).length > 0

    if (!isRepeat) {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat({...newPerson, id: res.id}))
      })
    } else {
      const oldPerson = persons.find(p => p.name === newName)
      personService
        .update(oldPerson.id, newPerson)
        .then(res => {
          const updated = persons
            .filter(p => p.name !== newName)
            .concat({...newPerson, id: res.id})
          setPersons(updated)
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <NumberDisplay persons={persons} newFilter={newFilter} setPersons={setPersons} />
    </div>
  )
}

export default App
