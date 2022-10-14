interface ExerciseData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}
type ParsedArgs = { dailyTarget: number; dailyHours: number[] };
type RatingVsDesc = { rating: number; desc: string };

const RatingDescriptions = {
  bad: "could've worked out more buddy",
  mid: "you did alr but still weak",
  good: "strong boi",
};

const parseExercise = (args: string[]): ParsedArgs => {
  if (args.length < 4) throw new Error("args incorrectly formatted");

  let t;
  if (!isNaN(Number(args[2]))) {
    t = Number(args[2]);
  } else {
    throw new Error("target arg was not number");
  }

  const dH = [];
  for (const arg of args.slice(3)) {
    if (!isNaN(Number(arg))) {
      dH.push(Number(arg));
    } else {
      throw new Error("receieved non-number in args");
    }
  }

  return {
    dailyTarget: t,
    dailyHours: dH,
  };
};

const calculateRating = ({ dailyTarget, dailyHours }: ParsedArgs): RatingVsDesc => {
  const length = dailyHours.length;
  const daysExercised = dailyHours.filter((day) => day >= dailyTarget).length;
  const percentExercised = Math.round((daysExercised / length) * 100);

  if (percentExercised < 33) return { rating: percentExercised, desc: RatingDescriptions.bad };
  else if (percentExercised < 66) return { rating: percentExercised, desc: RatingDescriptions.mid };
  else return { rating: percentExercised, desc: RatingDescriptions.good };
};

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
  };
  return calculatedData;
};

try {
  console.log("parsing excercise data");
  const parsedArgs = parseExercise(process.argv);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`recieved target: ${parsedArgs.dailyTarget} and daily array: ${parsedArgs.dailyHours}`);
  const { rating, desc } = calculateRating(parsedArgs);
  console.log(calculateExercises(parsedArgs.dailyHours, parsedArgs.dailyTarget, rating, desc));
} catch (error: unknown) {
  if (error instanceof Error) console.log("Error: " + error.message);
}
