const express = require('express');
const app = express();

const data = require('./data.js');
const contacts = data.notes;

const PORT = 3001;
app.listen(PORT);

app.get('/api/persons', (request, response) => {
  response.json(data);
});
