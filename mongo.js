const mongoose = require('mongoose')
//Locally connect to MongoDB example, for testing mongoose connection

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

//password from commanline arguments
const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const generateId = () => {
    return Math.floor(Math.random() * 10000) //returns random int from 0 to 9 999
}

//DB phonebook in mongoDB
const url =
    `mongodb+srv://fullstack:${password}@cluster0.2zp0a.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//Even though MongoDb doesn't care about the schema, Mongoose does, thus we need to set it. 
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

//Mongoose convention is to create collection in plural, thus here it will be 'People' not Persons!
const Person = mongoose.model('Person', personSchema)

//constructor function
const person = new Person({
    name: newName,
    number: newNumber,
    id: generateId()
})

//If only password given, just fetch persons from DB
//TODO: works, now make nicer
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    //make new person 
    person.save().then(response => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close() //remember to close mongoose db connection!
    })
}