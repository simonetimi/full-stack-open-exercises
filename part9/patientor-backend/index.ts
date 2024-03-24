import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientesRouter from './routes/patients';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// routes
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
