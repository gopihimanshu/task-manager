require('../src/db/mongoose')
const User = require('../src/models/user');

// Promise Chaining

User.findByIdAndUpdate('5e48eecc3a3dd42f3d135c24', { age: 10 }).then((user) => {
    console.log('First then ' + user)
    return { count: User.countDocuments({ age: 10 }), age: user.age }
}).then(({ age }) => {
    console.log('Second then ' + age)
    return age
}).then((age) => {
    console.log('Third then ' + age)
    return User.updateOne({ age: age }, { name: 'Himanshu Kumar' })
}).then((promise) => {
    console.log('Last then ' + promise)
}).catch((error) => {
    console.log(error)
})

User.findByIdAndUpdate('5e48eecc3a3dd42f3d135c24', { age: 10 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 10 })
}).then((result) => {
    console.log(result)
    return result
}).catch((error) => {
    console.log(error)
})