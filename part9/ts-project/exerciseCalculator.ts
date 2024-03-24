interface Results {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}
/*
const parseArguments = (args: string[]) => {
  args.splice(0, 2);
  if (args.length !== 8)
    throw new Error(
      'Arguments should be 8: the first 7 are your daily training hours from mon to sun. The last one is the daily training target.'
    );
  const realNumArgs = args.map((arg) => Number(arg)).filter((arg) => !isNaN(arg));
  if (realNumArgs.length === 8) {
    const dailyTarget = realNumArgs.pop() as number;
    return {
      trainingData: realNumArgs,
      dailyTarget,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
*/

export default function calculateExercises(trainingData: number[], dailyTarget: number): Results {
  if (trainingData.length < 7) {
    throw new Error('Daily data is missing!');
  }
  const trainingDays = trainingData.filter((day) => day > 0);
  const average = trainingDays.reduce((acc, current) => acc + current, 0) / trainingDays.length;

  // default rating is low, increase to 2 if average is bigger than daily target or to 3 if it's two times bigger
  let rating: 1 | 2 | 3 = 1;
  let ratingDescription = 'You tried, but you can do better!';
  if (average >= dailyTarget * 2) {
    rating = 3;
    ratingDescription = 'Wow, amazing job! Keep up!';
  } else if (average >= dailyTarget) {
    rating = 2;
    ratingDescription = "You did great, don't stop here!";
  }
  return {
    periodLength: trainingData.length,
    trainingDays: trainingDays.length,
    target: dailyTarget,
    average,
    success: average >= dailyTarget,
    rating,
    ratingDescription,
  };
}
