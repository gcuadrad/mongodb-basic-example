const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (error, client) => {
  assert.equal(error, null);

  console.log('Connected correctly to server');

  const db = client.db(dbname);
  // Find or create the collection
  const collection = db.collection('dishes');

  // Insert operation
  collection.insertOne({ name: 'Uthappiza', description: 'test' }, (error, result) => {
    assert.equal(error, null);
    console.log('After insert:\n');
    // How many operations has been successfully
    console.log(result.ops);
    // Find all elements in the collection
    collection.find({}).toArray((error, docs) => {
      assert.equal(error, null);

      console.log('Found:\n');
      console.log(docs);
      // delete the entire collection
      db.dropCollection('dishes', (error, result) => {
        assert.equal(error, null);

        client.close();
      });
      
    });
  });
  
});