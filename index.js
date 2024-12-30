const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())
const Person = require('./models/person')



let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

const Person  = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })  
})

  
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then( person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})  
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
  })
})




app.get('/info', (request, response) => {
  const number = persons.length
  const time = Date()
  const message =`
  <p>Phonebook has info for ${number} people</p>
  <p>${time}</p>
`;
  response.send(message)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
