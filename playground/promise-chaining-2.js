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

// async/await

const deleteTaskAndCount = async (id) => {
    const user = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: true})

    return count;
}

deleteTaskAndCount('5e4974fdf8c77f6fba5ee4a1').then((count) => {
    console.log('Count is' , count)
}).catch((error) => {
    console.log(error)
})