import React from "react"
import { CoursePart, PartProps } from "../util/types"
import { assertNever } from "../util/helper"

const Part = ({ course }: PartProps) => {
  const comp = (part: CoursePart) => {
    switch (part.type) {
      case "normal":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br /> <i> {part.description} </i>
          </p>
        )
      case "groupProject":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            project exercises: {part.groupProjectCount}
          </p>
        )
      case "submission":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i> {part.description} </i>
            <br />
            {part.exerciseSubmissionLink}
          </p>
        )
      case "special":
        return (
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i> {part.description} </i>
            <br />
            required skills: {part.requirements.join(', ')}
          </p>
        )
      default:
        assertNever(part)
        break
    }
  }

  return <>{comp(course)}</>
}

export default Part
