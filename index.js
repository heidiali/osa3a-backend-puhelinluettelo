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
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Define port and listen to it
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})