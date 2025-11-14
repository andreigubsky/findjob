const { MongoClient, ObjectId } = require('mongodb');
const redis = require('redis');

// MongoDB connection
const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
let db;
mongoClient.connect(err => {
    if (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
    db = mongoClient.db('your_database');
    console.log('Connected to MongoDB');
});

// Redis connection
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Example usage
const keys = ["some_key1", "some_key2"];
getDataFromCacheOrDb(keys).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});

const newData = { field: "new_value" };
updateDataInDbAndCache(keys, newData).then(() => {
    console.log('Update complete');
}).catch((err) => {
    console.error(err);
});

deleteDataInDbAndCache(keys).then(() => {
    console.log('Deletion complete');
}).catch((err) => {
    console.error(err);
});

const newDocument = { field: "value" };
insertDataInDbAndCache(newDocument).then((insertedId) => {
    console.log(`Document inserted with ID: ${insertedId}`);
}).catch((err) => {
    console.error(err);
});