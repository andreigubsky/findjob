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

# Setup database connection
npm install redis-driver mongodb



# Setup database connection for nestjs
npm install @nestjs/mongoose
npm install -D @types/mongoose