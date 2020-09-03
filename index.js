const express = require('express') //express funktiona
const { request, response } = require('express')
const app = express() //kutsutaan express app muuttujaan olioksi

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramow",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 5
    }
]

// HTTP POST request - JSON parser from express
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

const generateId = () => {
    return Math.floor(Math.random() * 10000) //returns random int from 0 to 9 999
}

//HTTP POST, body 
app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log('body: ', body)

    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
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