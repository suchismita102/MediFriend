const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDb Connected..');
    })
    .catch((err) => {
        console.error('MongoDb Connection Error: ', err);
    });