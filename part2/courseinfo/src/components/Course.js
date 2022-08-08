import React from "react"

const Header = ({ name }) => <h1>{name}</h1>
const Total = ({ sum }) => <p>Number of exercises {sum}</p>
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
}

const Course = ({ course }) => {
  console.log(course);
  return <> 
    <Header name={course.name}/>
    <Content parts={course.parts} />
  </>
}

export default Course