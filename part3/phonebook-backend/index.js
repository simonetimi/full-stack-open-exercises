const express = require('express');
const app = express();

const data = require('./data.js');
const contacts = data.contacts;

const PORT = 3001;
app.listen(PORT);

app.get('/api/persons', (request, response) => {
  response.json(data);
});

app.get('/api/info', (request, response) => {
  const numberOfPeople = contacts.length;
  const now = new Date();
  const info = `<p>Phonebook has ${numberOfPeople} contacts</p><p>${now}</p>`;
  response.send(info);
});
