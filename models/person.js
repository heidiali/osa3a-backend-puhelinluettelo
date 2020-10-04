const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('connecting to ', url)

// MongoDB via Mongoose
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

// Mongoose schema 
// Add toJSON transforms objects after querying db and before sending response
const personSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: String,
    },
    id: {
        type: Number,
    }
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

// Export Mongoose model - what is shown to user
module.exports = mongoose.model('Person', personSchema);