const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('../sockets/sockets.controller');

class Server {
  #app;
  #port;
  #server;
  #io;
  constructor() {
    this.#app = express();
    this.#port = process.env.PORT ?? 4000;

    // http server
    this.server = http.createServer(this.#app);
    // configuraciones de sockets
    this.io = socketio(this.server, {
      /*Configuraciones */
    });
    this.middlewares();
    this.sockets();
  }
  middlewares() {
    this.#app.use(express.static(path.join(__dirname, '../public')));
  }

  sockets() {
    new Sockets(this.io);
  }

  listen() {
    // inicializar el servidor
    this.server.listen(this.#port, () => {
      console.log(`Server is running on port ${this.#port}`);
    });
  }
}

module.exports = Server;
