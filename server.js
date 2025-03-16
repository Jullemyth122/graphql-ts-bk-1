const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const accountsTypeDefs = require('./types/typeDefsAccounts');
const accountsResolvers = require('./resolvers/resolversAccount');
const commentsTypeDefs = require('./types/typeDefsComments');
const commentsResolvers = require('./resolvers/resolversComments');

const app = express();

app.use(cors({
  // origin: 'http://localhost:5173', 
  origin: 'http://localhost:5174', // Adjust as needed for your frontend
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const accountsServer = new ApolloServer({
  typeDefs: accountsTypeDefs,
  resolvers: accountsResolvers,
  debug: true,
});

const commentsServer = new ApolloServer({
  typeDefs: commentsTypeDefs,
  resolvers: commentsResolvers,
  debug: true,
});

async function startServers() {
  await accountsServer.start();
  await commentsServer.start();

  // Use different endpoints for accounts and comments
  app.use('/graphql/accounts', expressMiddleware(accountsServer));
  app.use('/graphql/comments', expressMiddleware(commentsServer));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServers();
