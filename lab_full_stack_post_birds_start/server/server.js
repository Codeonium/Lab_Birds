const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const parser = require('body-parser');

app.use(parser.json());
app.use(cors())

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('birds');
    const sightingsCollection = db.collection('sightings');
    const sightingsRouter = createRouter(sightingsCollection);
    app.use('/api/sightings', sightingsRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
