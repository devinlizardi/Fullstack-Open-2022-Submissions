/*
BMI is calculated as body mass divided by square of body height
@param: height in cm
@param: weight in kg
@return bmi in kg/m^2
*/

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2)

  if (bmi < 16) { return 'Underweight (severe thinness)' }
  if (bmi <= 16.9) { return 'Underweight (moderate thinness)' }
  if (bmi <= 18.4) { return 'Underweight (mild thinness)' }
  if (bmi <= 24.9) { return 'Normal range' }
  if (bmi <= 29.9) { return 'Overweight (pre-obese)' }
  if (bmi <= 34.9) { return 'Obese (class I)' }
  if (bmi <= 39.9) { return 'Obese (class II)' }
  else { return 'Obese (class III)' }
}

console.log(calculateBmi(180, 74))