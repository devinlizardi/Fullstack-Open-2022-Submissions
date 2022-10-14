interface ExerciseData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}
type ParsedArgs = { dailyTarget: number; dailyHours: number[] }
type RatingVsDesc = { rating: number; desc: string }

const RatingDescriptions = {
  bad: "could've worked out more buddy",
  mid: "you did alr but still weak",
  good: "strong boi",
}

const parseExercise = (args: string[]): ParsedArgs => {
  if (args.length < 4) throw new Error("args incorrectly formatted")

  let t
  if (!isNaN(Number(args[2]))) {
    t = Number(args[2])
  } else {
    throw new Error("target arg was not number")
  }

  let dH = []
  for (const arg of args.slice(3)) {
    if (!isNaN(Number(arg))) {
      dH.push(Number(arg))
    } else {
      throw new Error("receieved non-number in args")
    }
  }

  return {
    dailyTarget: t,
    dailyHours: dH,
  }
}

const calculateRating = (parsedArgs: ExerciseData): RatingVsDesc => {
  let rating = (parsedArgs.periodLength - parsedArgs.trainingDays) % 3
  switch (rating) {
    case 1:
      return { rating: 1, desc: RatingDescriptions.mid }
    case 2:
      return { rating: 2, desc: RatingDescriptions.good }
    default:
      return { rating: 0, desc: RatingDescriptions.bad }
  }
}

const calculateExercises = (
  dailyExerciseHours: number[],
  dailyTarget: number,
  rating: number,
  ratingDesc: string
): ExerciseData => {
  const calculatedData: ExerciseData = {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((day) => day != 0).length,
    success: dailyExerciseHours.filter((day) => day >= dailyTarget).length === dailyExerciseHours.length,
    rating: rating,
    ratingDescription: ratingDesc,
    target: dailyTarget,
    average: dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / dailyExerciseHours.length,
  }
  return calculatedData
}

try {
  console.log("parsing excercise data")
  const { dailyTarget, dailyHours } = parseExercise(process.argv)
  console.log(`recieved target: ${dailyTarget} and daily array: ${dailyHours}`)
  console.log(calculateExercises(dailyHours, dailyTarget, 3, "hi"))
} catch (error: unknown) {
  if (error instanceof Error) console.log("Error: " + error.message)
}
