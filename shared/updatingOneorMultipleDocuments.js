const updateDataInDbAndCache = async (keys, newData) => {
    try {
        // Update MongoDB
        await db.collection('your_collection')
            .updateMany({ _id: { $in: keys.map(key => new ObjectId(key)) } }, { $set: newData });

        // Invalidate Redis cache
        const pipeline = redisClient.pipeline();
        keys.forEach((key) => {
            pipeline.del(key);
        });

        pipeline.exec((err, responses) => {
            if (err) console.error('Redis error:', err);
            responses.forEach((response, index) => {
                if (response[1] === 1) {
                    console.log(`Cache for key ${keys[index]} invalidated`);
                }
            });
        });
    } catch (err) {
        console.error('MongoDB error:', err);
    }
};