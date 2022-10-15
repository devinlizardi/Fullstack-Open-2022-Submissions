/*
  BMI is calculated as body mass divided by square of body height
  @param: height in cm
  @param: weight in kg
  @return bmi in kg/m^2
*/
export interface HealthData {
  weight: number
  height: number
  bmi?: string
}

const isHealthData = (value: unknown): value is HealthData =>
  typeof value == "object" 
    && "height" in (value as HealthData) 
    && "weight" in (value as HealthData)
    && !isNaN(Number((value as HealthData).height))
    && !isNaN(Number((value as HealthData).weight));

const parseBmi = (data: HealthData): HealthData => {
  const { height, weight } = data;
  const text = calculateBmi(height, weight);
  return { weight: weight, height: height, bmi: text };
};

const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ** 2;
  if (bmi < 16) return "Underweight (severe thinness)";
  if (bmi <= 16.9) return "Underweight (moderate thinness)";
  if (bmi <= 18.4) return "Underweight (mild thinness)";
  if (bmi <= 24.9) return "Normal range";
  if (bmi <= 29.9) return "Overweight (pre-obese)";
  if (bmi <= 34.9) return "Obese (class I)";
  if (bmi <= 39.9) return "Obese (class II)";
  else {
    return "Obese (class III)";
  }
};

const run = (data: unknown): HealthData => {
  if (isHealthData(data)) {
    return parseBmi(data);
  } else {
    throw new Error('error parsing weight and height from request');
  }
};

export default run;
