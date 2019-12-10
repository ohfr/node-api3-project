const express = require('express');

const server = express();

const logger = require("./Middleware/logger");

server.use(logger());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
