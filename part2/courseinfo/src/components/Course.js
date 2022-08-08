import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;
const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach((part) => (sum += part.exercises));
  return <b>total of {sum} exercises</b>;
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
