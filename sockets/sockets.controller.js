// const socketController =

// module.exports = socketController;

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      // socket.emit('message', {
      //   message: 'Bienvenido al chat',
      //   date: new Date(),
      // });
      socket.on('mensaje-to-server', (payload) => {
        console.log(payload);
        // io para emitir el mensaje a todos los clientes
        // socket para emitir el mensaje solo a un cliente
        this.io.emit('mensaje-from-server', payload);
      });
    });
  }
}

module.exports = Sockets;
