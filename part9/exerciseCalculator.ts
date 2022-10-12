interface ExerciseData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const RatingDescriptions = {
  bad: "could've worked out more buddy",
  mid: "you did alr but still weak",
  good: "strong boi"
}

const calculateExercises = (dailyExerciseHours: number[], dailyTarget: number): ExerciseData => {
  type RatingVsDesc = { rating: number, desc: string }

  const calculateRating = (): RatingVsDesc  => {
    let rating = dailyExerciseHours.filter(day => day >= dailyTarget).length % 3
    switch(rating) {
      case 1:
        return { rating: 1, desc: RatingDescriptions.mid }
      case 2:
        return { rating: 2, desc: RatingDescriptions.good }
      default:
        return { rating: 0, desc: RatingDescriptions.bad }
    }
  }

  const ratingInfo = calculateRating()

  const calculatedData: ExerciseData = {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((day) => day != 0).length,
    success: dailyExerciseHours.filter(day => day >= dailyTarget).length === dailyExerciseHours.length,
    rating: ratingInfo.rating,
    ratingDescription: ratingInfo.desc,
    target: dailyTarget,
    average: dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / dailyExerciseHours.length,
  }

  return calculatedData
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
