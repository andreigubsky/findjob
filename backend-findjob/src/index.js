import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

    import mongoose from 'mongoose'; // Example with Mongoose for MongoDB

    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;

    // const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
    const connectionString = `mongodb://${dbHost}:${dbPort}`;

    mongoose.connect(connectionString)
    const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', dbHost)
})

db.on('error', err => {
  console.error('connection error:', err)
})