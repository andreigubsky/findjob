# Create project structure
mkdir fullstack-app && cd fullstack-app
mkdir frontend backend database shared

# Initialize frontend (react)
cd frontend
npx create-react-app . 
npm install axios react-router-dom

# Initialize backend (nestjs)
cd ../backend
npm init -y
npm install express cors dotenv helmet
npm install -D nodemon @types/node

nest new auth-app
cd auth-app
npm install @nestjs/mongoose mongoose @nestjs/jwt @nestjs/passport passport-jwt bcryptjs
npm install --save-dev @types/bcryptjs @types/passport-jwt

# Setup database connection
npm install mongodb redis


# Setup MongoDB database connection for nestjs
npm install @nestjs/mongoose
npm install -D @types/mongoose

# Setup Postgresql database connection for nestjs
npm install @prisma/client prisma

# Initialize database
npx prisma init






# Using Redis as a Cache for MongoDB with Node.js
https://medium.com/@na.mazaheri/using-redis-as-a-cache-for-mongodb-with-node-js-aaf303cfb513