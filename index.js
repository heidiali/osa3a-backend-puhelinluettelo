require('dotenv').config();
const express = require('express') //express as a function 
const app = express() //calling express 
const cors = require('cors') //cors middleware to allow cross-origin requests
var morgan = require('morgan') //morgan middleware as function
const Person = require('./models/person');

const { request, response } = require('express')

//Middleware to be used
// HTTP POST request - JSON parser from express
app.use(express.static('build')) //express middleware static, to show static content from build folder
app.use(express.json())
app.use(cors()) //cors into use
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
app.get('/info', (request, response, next) => {
    const time = new Date()
    Person.find()
        .then(persons => {
            response.send(`
            <p>Phonebook has info for ${persons.length} people.</p>
            <p>${time}</p>
        `);
        })
        .catch(next);
})

//Get all persons (people)
app.get('/api/persons', (request, response, next) => {
    Person.find()
        .then(persons => response.json(persons))
        .catch(next);//TODO: Why does this still throw an error?
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)

    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end() //status & end => respond without data
            }
        })
        .catch(error => next(error))
})

const generateId = () => {
    return Math.floor(Math.random() * 10000) //returns random int from 0 to 9 999
}

//Add new person
app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body;
    console.log('request.body', request.body)
    const person = new Person({ name, number });

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

    person.save()
        .then(newPerson => response.json(newPerson))
        .catch(next);
})

// Update existing person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    //Person.findByIdAndDelete(request.params.id)
    Person.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error))
})

// Middleware to handle unknown endpoints - correct positioning?
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

// Middleware to handle errors - correct positioning?
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).json({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

//Define port and listen to it
//const PORT = process.env.PORT
const PORT = process.env.PORT || 3001 // environment port (heroku configured) or localhost 3001
console.log('PORT:', PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})