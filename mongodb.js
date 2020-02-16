const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // Create and Read the Data

    db.collection('users').findOne({ _id: new ObjectID('5e422c8058000b5e23da03ba')}, (error, results) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(results);
        client.close();
    })

    db.collection('users').find({ age : 28 }).toArray((error, users) => {
        console.log(users);
        client.close();
    })

    db.collection('users').find({ age : 28 }).count((error, count) => {
        console.log(count);
        client.close();
    })

    db.collection('tasks').findOne({ _id: new ObjectID('5e4224d85e23195ae1f3e4b6')}, (error, result) => {
        if (error) {
            return console.log('Unable to find the user')
        }

        console.log(result);
        client.close();
    });

    db.collection('tasks').find({ completed : true}).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to find the tasks');
        }

        console.log(tasks);
        client.close();
    });

    // Update the Data

    db.collection('users').updateOne({
        _id: new ObjectID('5e4222dfb6a12759dfd07c74')
    },
    {
        $inc: {
            age: 1,
        }
    }).then((result) => {
        console.log('Document updated' + result);
        client.close();
    }).catch((error) => {
        console.log('Some Error' + error);
        client.close();
    });

    db.collection('tasks').updateMany({
        completed: true
    },
    {
        $set: {
            completed : false
        }
    }).then((result) => {
        console.log('Document updated' + result);
        client.close();
    }).catch((error) => {
        console.log('Some Error' + error);
        client.close();
    });

    // Delete the Data

    db.collection('users').deleteMany({
        completed: false
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    db.collection('users').deleteOne(
        {
            age: 15
        }
    ).then(result => {
        console.log(result);
        client.close();
    }).catch(error => {
        console.log(error);
        client.close();
    })
})