const getDataFromCacheOrDb = async (keys) => {
    return new Promise(async (resolve, reject) => {
        const results = [];
        const missingKeys = [];
        const pipeline = redisClient.pipeline();

        keys.forEach((key) => {
            pipeline.get(key);
        });

        pipeline.exec(async (err, cachedResults) => {
            if (err) return reject(err);

            for (let i = 0; i < cachedResults.length; i++) {
                const cachedData = cachedResults[i][1];
                if (cachedData) {
                    console.log(`Data for key ${keys[i]} retrieved from Redis`);
                    results.push(JSON.parse(cachedData));
                } else {
                    missingKeys.push(keys[i]);
                }
            }

            if (missingKeys.length > 0) {
                try {
                    const mongoResults = await db.collection('your_collection')
                        .find({ _id: { $in: missingKeys.map(key => new ObjectId(key)) } })
                        .toArray();

                    mongoResults.forEach((doc) => {
                        results.push(doc);
                        redisClient.setex(doc._id.toString(), 3600, JSON.stringify(doc)); // Cache expires after 1 hour
                        console.log(`Data for key ${doc._id} retrieved from MongoDB and cached in Redis`);
                    });

                    resolve(results);
                } catch (mongoErr) {
                    reject(mongoErr);
                }
            } else {
                resolve(results);
            }
        });
    });
};