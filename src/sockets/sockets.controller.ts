import { Server } from 'socket.io';

class Sockets {
  #io: Server;
  constructor(io: Server) {
    this.#io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.#io.on('connection', (socket) => {
      // socket.emit('message', {
      //   message: 'Bienvenido al chat',
      //   date: new Date(),
      // });
      socket.on('mensaje-to-server', (payload) => {
        console.log(payload);
        // io para emitir el mensaje a todos los clientes
        // socket para emitir el mensaje solo a un cliente
        this.#io.emit('mensaje-from-server', payload);
      });
    });
  }
}

export default Sockets;
