const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');


server.use((req, res, next) => {
  next()
})

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
  res.send('This is a poorly constructed test');
});


module.exports = server;
