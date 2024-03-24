function calculateBmi(height: number, weight: number): string {
  if (height === 0 || weight === 0) {
    return "Values can't be zero!";
  } else if (isNaN(height) || isNaN(weight)) {
    return 'Provided values were not numbers!';
  }
  const heightInMeters = height / 100;
  const BMI = weight / heightInMeters ** 2;
  if (BMI < 18.5) {
    return 'Underweight';
  }
  if (BMI < 25) {
    return 'Healthy weight';
  }
  if (BMI < 30) {
    return 'Overweight';
  }
  if (BMI >= 30) {
    return 'Obese';
  }
}

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
