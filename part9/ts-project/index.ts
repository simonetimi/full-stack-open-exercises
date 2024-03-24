import express from 'express';
import bodyParser from 'body-parser';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface UserData {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.status(200).json({ bmi: bmi, height: height, weight: weight });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    const userData = req.body as UserData;
    if (!userData.target) {
      throw new Error('Target is missing');
    }
    if (userData.daily_exercises.some(isNaN) || isNaN(userData.target)) {
      throw new Error('Malformatted data');
    }
    const exercisesResults = calculateExercises(userData.daily_exercises, userData.target);
    res.status(200).json(exercisesResults);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
