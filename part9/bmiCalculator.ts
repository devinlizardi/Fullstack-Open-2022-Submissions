/*
  BMI is calculated as body mass divided by square of body height
  @param: height in cm
  @param: weight in kg
  @return bmi in kg/m^2
*/
export interface HealthData {
  weight: number
  height: number
  bmi: string
}

const parseBmi = (data: any): HealthData => {
  if (!data.weight || !data.height) {
    throw new Error("missing weight and/or height")
  }
  const { height, weight } = data
  const text = calculateBmi(height, weight)
  return { weight: weight, height: height, bmi: text }
}

const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ** 2
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

const run = (data: any): any => {
  try {
    return parseBmi(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error
    }
  }
}

export default run
