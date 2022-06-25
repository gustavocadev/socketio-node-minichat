import express from 'express';
import type { Express } from 'express';
import http from 'http';
import * as SocketIO from 'socket.io';
import path from 'path';
import Sockets from './sockets/sockets.controller';
import cors from 'cors';
import morgan from 'morgan';

class Server {
  #app: Express;
  #port: number;
  #server: http.Server;
  #io: SocketIO.Server;
  constructor() {
    this.#app = express();
    this.#port = Number(process.env.PORT) ?? 4000;

    // http server
    this.#server = http.createServer(this.#app);
    // configuraciones de sockets
    this.#io = new SocketIO.Server(this.#server, {
      /*Configuraciones */
    });
    this.middlewares();
    this.sockets();
  }
  middlewares() {
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded());
    this.#app.use(morgan('dev'));
    this.#app.use(express.static(path.join(__dirname, '../public')));
  }

  sockets() {
    new Sockets(this.#io);
  }

  listen() {
    // inicializar el servidor
    this.#server.listen(this.#port, () => {
      console.log(`Server is running on port ${this.#port} 🎈`);
    });
  }
}

export default Server;
