const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(morgan('tiny'))



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

  
app.get('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        if (person.number) {
            response.json(person.number)
        } else {
            response.status(404).end()
        }
    } else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })  

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    const generateId = () => {
        return(
        Math.floor(Math.random() * 10000)
        )
    } 
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })

    }
    
    if (!body.number) {
    return response.status(400).json({ 
        error: 'number missing' 
    })
    }

    if (persons.some( person => person.name == body.name)) {
      return response.status(400).json({ 
          error: 'name must be unique' 
      })
      }

      const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }

      persons = persons.concat(person)
      response.json(person)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
