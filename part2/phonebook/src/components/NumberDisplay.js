import React from "react"

const PersonItem = ({ person }) => {
  const { name, number } = person
  return (
    <li>
      {name} {number}
    </li>
  )
}

const NumberDisplay = ({ persons, newFilter }) => {
  const filtered = persons.filter((person) => {
    let p = person.name.toLowerCase()
    return p.includes(newFilter.toLowerCase())
  })

  return (
    <ul>
      {filtered.map((person) => (
        <PersonItem key={person.name} person={person} />
      ))}
    </ul>
  )
}

export default NumberDisplay
