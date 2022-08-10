import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const CountryDisplay = ({ country }) => {
  const name = country.name.common
  const capital = country.capital[0]
  const languages = Object.values(country.languages)
  const flag = country.flags.png

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p> <br />
      <b>languages: </b>
      <ul>
        {languages.map((lang) => (
          <li key={lang}> {lang} </li>
        ))}
      </ul>
      <img src={flag} alt={"flag"} />
    </div>
  )
}

const DisplayCountries = ({ countries, filter, manualFilter }) => {
  const namesFiltered = countries.filter((country) => {
    let c = country.name.common.toLowerCase()
    return c.includes(filter.toLowerCase())
  })

  if (namesFiltered.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (namesFiltered.length === 1) {
    return <CountryDisplay country={namesFiltered[0]} />
  }

  const doFilter = () => {
    const result = namesFiltered.map(({ name }) => (
      <li key={name.official}>
        {name.common} <button onClick={() => manualFilter(name.common)}>show</button> <br />
      </li>
    ))
    return result
  }

  return <ul style={{ listStyleType: "none" }}>{doFilter()}</ul>
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data)
    })
  }, [])

  const manualFilter = (name) => {
    setFilter(name)
  } 

  return (
    <div>
      find countries{" "}
      <input
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value)
        }}
      />
      <DisplayCountries countries={countries} filter={filter} manualFilter={manualFilter} />
    </div>
  )
}

export default App
