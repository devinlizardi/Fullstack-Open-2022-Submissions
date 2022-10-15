export interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
type ParsedArgs = {
  daily_exercises: number[];
  target: number;
};

enum RatingDescriptions {
  bad = "could've worked out more buddy",
  mid = "you did alr but still weak",
  good = "strong boi",
}

type RatingInfo = {
  num: number;
  desc: RatingDescriptions;
};

const isParsedArgs = (args: unknown): args is ParsedArgs => 
  typeof args == "object"
  && 'daily_exercises' in (args as ParsedArgs)
  && 'target' in (args as ParsedArgs);

const isValidData = (args: ParsedArgs): args is ParsedArgs =>
  !isNaN(Number(args.target))
  && Array.isArray(args.daily_exercises)
  && args.daily_exercises.filter(num => isNaN(Number(num))).length === 0;

const calculateRating = ({ daily_exercises, target }: ParsedArgs): RatingInfo => {
  const length = daily_exercises.length;
  const daysExercised = daily_exercises.filter((day) => day >= target).length;
  const percentExercised = Math.round((daysExercised / length) * 100);

  if (percentExercised < 33) return { num: percentExercised, desc: RatingDescriptions.bad };
  else if (percentExercised < 66) return { num: percentExercised, desc: RatingDescriptions.mid };
  else return { num: percentExercised, desc: RatingDescriptions.good };
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

export default (params: unknown) => {
  if (!isParsedArgs(params)) throw new Error('parameters missing');
  if (!isValidData(params)) throw new Error('malformatted parameters');

  const ratingInfo: RatingInfo = calculateRating(params);
  return calculateExercises(params.daily_exercises, params.target, ratingInfo.num, ratingInfo.desc);
};