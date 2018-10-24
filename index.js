const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./oprations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

// MongoClient.connect(url, (err, client) => {
MongoClient.connect(url).then((client) => {

    // assert.equal(err, null);

    console.log("Connected correctly to server");

    const db = client.db(dbname);

    // const collection = db.collection('dishes');

    // collection.insertOne({"name": "Nirav", "description":"test"},(err, result) => {
    //     assert.equal(err,null);

    //     console.log("After Inserted: \n");
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);

    //         console.log("Found:\n");
    //         console.log(docs);

    //         db.dropCollection("dishes",(err,result) => {
    //             assert.equal(err,null);

    //             client.close();
    //         });
    //     });

    // });

    dboper.insertDocument(db, { name: "Vadonut", description: "Test Description" }, 'dishes')
        .then((result) => {

            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" }, { description: " Updated Description " }, 'dishes')

        })

        .then((result) => {

            console.log("Updated Documents:\n", result.result);

            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);


            return db.dropCollection('dishes')
        })
        .then((result) => {

            console.log("Droped Collection: ", result);

            client.close();
        }).catch((err) => {
            console.log(err);
        });

}).catch((err) => {
    console.log(err);
});

