/*
  BMI is calculated as body mass divided by square of body height
  @param: height in cm
  @param: weight in kg
  @return bmi in kg/m^2
*/
interface HealthData {
  height: number
  weight: number
}

const parseBmi = (args: string[]): HealthData => {
  if (args.length != 4) throw new Error("not enough / too many args")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]) / 100,
      weight: Number(args[3]),
    }
  } else {
    throw new Error("values were not numbers!")
  }
}

const calculateBmi = (h: number, w: number): string => {
  const bmi = w / h ** 2
  if (bmi < 16) return "Underweight (severe thinness)"
  if (bmi <= 16.9) return "Underweight (moderate thinness)"
  if (bmi <= 18.4) return "Underweight (mild thinness)"
  if (bmi <= 24.9) return "Normal range"
  if (bmi <= 29.9) return "Overweight (pre-obese)"
  if (bmi <= 34.9) return "Obese (class I)"
  if (bmi <= 39.9) return "Obese (class II)"
  else {
    return "Obese (class III)"
  }
}

try {
  const { height, weight } = parseBmi(process.argv)
  console.log(`running with height ${height} and weight ${weight}`)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = "something bad happened \n"
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message
  }
  console.log(errorMessage)
}