import net from 'net';

const PORT = 5555;

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}: ${socket.remotePort}`);
});

server.listen(PORT, () => {
  console.log(`Multi Player Server listening on port ${PORT}`);
  console.log(server.address());
});
