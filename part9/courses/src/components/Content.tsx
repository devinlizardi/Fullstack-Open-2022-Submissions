import React from "react"
import Part from "./Part"
import { ContentProps } from "../util/types"

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </>
  )
}

export default Content