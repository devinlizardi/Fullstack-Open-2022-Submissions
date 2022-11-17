export type CourseData = {
  name: string
  exerciseCount: number
}

export interface ContentProps {
  courseParts: CourseData[]
}