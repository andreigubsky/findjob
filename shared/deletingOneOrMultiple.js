const deleteDataInDbAndCache = async (keys) => {
    try {
        // Delete from MongoDB
        await db.collection('your_collection')
            .deleteMany({ _id: { $in: keys.map(key => new ObjectId(key)) } });

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