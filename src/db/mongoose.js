const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// Stop to Pluralize the model name 
mongoose.pluralize(null);

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10,
        validate(value){
            if (validator.isLength(value, {min:8, max: 16})) {
                throw new Error('Password must be greater than 8 character and less than 16 character')
            }
        }
    }
});

const me = new User({
    name: '  Himanshu    ',
    email: 'gopi@gmail.com',
    password: 'hello'
});

me.save().then((me) => {
    console.log(me);
}).catch((error) => {
    console.log(error);
});

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Task({
//     description: 'Clean the Kitchen',
//     completed: true
// });

// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// });