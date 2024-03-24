export default function calculateBmi(height: number, weight: number): string {
  if (height === 0 || weight === 0) {
    throw new Error("Values can't be zero!");
  } else if (isNaN(height) || isNaN(weight)) {
    console.log(height);
    console.log(weight);
    throw new Error('Provided values were not numbers!');
  }
  const heightInMeters = height / 100;
  const BMI = weight / heightInMeters ** 2;
  if (BMI < 18.5) {
    return `Underweight: BMI is ${BMI}`;
  }
  if (BMI < 25) {
    return `Healthy weight: BMI is ${BMI}`;
  }
  if (BMI < 30) {
    return `Overweight: BMI is ${BMI}`;
  }
  if (BMI >= 30) {
    return `Obese: BMI is ${BMI}`;
  }
  return 'Not supported';
}
