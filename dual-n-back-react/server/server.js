﻿#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require("http");
const app = require("./app");
const socketIO = require('socket.io')
const scoreCtrl = require('./controllers/ScoreController')

/**
 * Get port from environment and store in Express.
 */

var PORT = process.env.PORT || 8080;

const port = normalizePort(PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);


/**
 * Create WebSocket server
 */

const io = socketIO(server);


// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

   // disconnect is fired when a client leaves the server
   socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  //Request to get highscores
  socket.on("get scores", () => {
    emitHighestScores();
  })

  //On new score submitted
  socket.on("new score", (score) => {
    console.log(`Score received: ${score.name}, ${score.score}`);
    scoreCtrl.create(score);
    emitHighestScores();
  })

})

function emitHighestScores() {
  scoreCtrl.getTopScores(
    scores => {
      console.log(scores)
      io.sockets.emit("scores updated", scores);
    }
  );

}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
