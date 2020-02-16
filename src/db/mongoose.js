const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

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
        trim: true,
        minlength: 6,
        validate(value){
            if (validator.contains(value, 'password')) {
                throw new Error('Password must be greater than 6 character and does not contains word password')
            }
        }
    }
});

// const me = new User({
//     name: '  Himanshu    ',
//     email: '    gopi@gmail.com',
//     password: ' hello  world   '
// });

// me.save().then((me) => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'Eat Lunch   ',
    completed: true
});

task.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log(error)
});