require('dotenv').config();
const express = require('express') //express as a function 
const app = express() //calling express 
const cors = require('cors') //cors middleware to allow cross-origin requests
var morgan = require('morgan') //morgan middleware as function
const Person = require('./models/person');

const { request, response } = require('express')

//Middleware to be used
// HTTP POST request - JSON parser from express
app.use(cors()) //cors into use
app.use(express.json())
app.use(express.static('build')) //express middleware static, to show static content from build folder
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms, content :content') //Modified version of morgan's tiny format string, with custom tokens
)
//content from http POST: 
morgan.token('content', function (request, response) {
    return JSON.stringify(request.body)
})

//Test route
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Info route - how many persons?
app.get('/info', (request, response) => {
    const time = new Date()
    Person.find()
        .then(persons => {
            response.send(`
            <p>Phonebook has info for ${persons.length} people.</p>
            <p>${time}</p>
        `);
        })
        .catch(console.log('Error in fetching info. '));
})

app.get('/api/persons', (request, response) => {
    Person.find()
        .then(persons => response.json(persons))
        .catch(console.log('Error occurred in api/persons'));
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    Person.findById(id)
        .then(person => {

            if (person) {
                response.json(person)
            } else {
                response.status(404).end() //status & end => respond without data
            }
        })
        .catch(console.log('Person does not exist.'));
})

const generateId = () => {
    return Math.floor(Math.random() * 10000) //returns random int from 0 to 9 999
}

//Add new person
app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;
    console.log('request.body', request.body)

    const person = new Person({ name, number });

    //TODO: this crashes now. separate into separate put logic 
    //const nameExists = Person.find(person => person.name === name)
    //const nameExists = persons.find(person => person.name === name)
    //console.log('nameExists: ', nameExists)

    if (!name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    //HOX! run POST test twice to test for dublicates, since it won't remember new things. Or use Arto Hellas
    // if (nameExists) {
    //     //TODO: Use put
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    person.save()
        .then(newPerson => response.json(newPerson))
        .catch(console.log('Error creating a new person. '));

})

//TODO: Check that it works 
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
        .catch(console.log('Error in deleting person information. '));
})

//Define port and listen to it
//const PORT = process.env.PORT
const PORT = process.env.PORT || 3001 // environment port (heroku configured) or localhost 3001
console.log('PORT:', PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})