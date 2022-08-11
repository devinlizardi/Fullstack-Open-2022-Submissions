import React from "react"
import personService from './../services/persons'

const PersonItem = ({ person, persons, setPersons }) => {
  const { name, number, id } = person
  const handleClick = () => {
    personService
      .remove(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <li>
      {name} {number} <button onClick={handleClick}>delete</button>
    </li>
  )
}

const NumberDisplay = ({ persons, newFilter, setPersons }) => {
  const filtered = persons.filter((person) => {
    let p = person.name.toLowerCase()
    return p.includes(newFilter.toLowerCase())
  })

  return (
    <ul>
      {filtered.map((person) => (
        <PersonItem key={person.name} person={person} persons={persons} setPersons={setPersons} />
      ))}
    </ul>
  )
}

export default NumberDisplay
