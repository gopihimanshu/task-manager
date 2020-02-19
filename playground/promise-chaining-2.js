require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5e481545efb41fb1ee8e500b').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: true})
}).then((count) => {
    console.log('no of documents ' + count)
}).catch((e) => {
    console.log(e)
})