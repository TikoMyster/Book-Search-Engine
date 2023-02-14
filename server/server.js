const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = path.dirname("");

app.use(express.static(path.join(__dirname, "../client/public/index.html")))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/public/index.html')));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"))
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    
});
});