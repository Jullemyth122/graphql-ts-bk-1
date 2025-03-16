const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust if your frontend runs on a different port
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

const server = new ApolloServer({ typeDefs, resolvers, debug: true });

async function startServer() {

  await server.start();
  app.use('/graphql', expressMiddleware(server));
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}

startServer();