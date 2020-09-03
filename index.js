const express = require('express') //express funktiona
const { request, response } = require('express')
const app = express() //kutsutaan express app muuttujaan olioksi

let persons = [
    {
        name: "Arto Hellas",
        date: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        date: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramow",
        date: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        date: "39-23-6423122",
        id: 5
    }
]

// HTTP POST pyyntöä varten alustettava express:in JSON parseri
app.use(express.json())

//Test route
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Info route
app.get('/info', (request, response) => {
    const time = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p></br> <p> ${time} </p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log(id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end() //status & end => respond without data
    }

    //console.log(note)
    response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end() //status 204 or 404 for a deleted instance
})

//Define port and listen to it
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})