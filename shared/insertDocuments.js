const insertDataInDbAndCache = async (data) => {
    try {
        // Insert into MongoDB
        const result = await db.collection('your_collection').insertOne(data);
        const insertedId = result.insertedId;

        // Cache the inserted document in Redis
        redisClient.setex(insertedId.toString(), 3600, JSON.stringify(data)); // Cache expires after 1 hour
        console.log(`Data for key ${insertedId} inserted into MongoDB and cached in Redis`);
        
        return insertedId;
    } catch (err) {
        console.error('MongoDB error:', err);
        throw err;
    }
};