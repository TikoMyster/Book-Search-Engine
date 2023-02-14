const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const { 
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { resolvers, typedefs } = require("./routes/index");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const httpServer = http.createServer(app);

const server = new ApolloServer({
  resolvers,
  typedefs,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = path.dirname("");

app.use(express.static(path.join(__dirname, "../client/public/index.html")))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/public/index.html')));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"))
});

const startApolloServer = async () => {
  await server.start( );
  app.use(
    '/',
    cors(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  )
};

db.once('open', async () => {
  await new Promise((resolve) => httpServer.listen ({ port: PORT }, resolve));
    console.log(`🌍 Now listening on localhost:${PORT}`);
    
  });

startApolloServer();