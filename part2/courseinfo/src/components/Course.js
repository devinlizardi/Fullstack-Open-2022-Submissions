import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;
const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => { return s + p.exercises }, 0);
  return <b>total of {total} exercises</b>;
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
