const express = require('express');
const app = express();

const data = require('./data.js');
let contacts = data.contacts;

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

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const contact = contacts.filter((contact) => contact.id === id);
  if (contact.length < 1) {
    return response.status(404).json({
      error: 'Contact not found',
    });
  }
  response.json(contact);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const numbOfContacts = contacts.length;
  contacts = contacts.filter((contact) => contact.id !== id);
  if (contacts.length === numbOfContacts) {
    return response.status(404).json({
      error: 'Contact not found',
    });
  }
  response.status(204).end();
});
