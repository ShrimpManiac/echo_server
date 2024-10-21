import net from 'net';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}: ${socket.remotePort}`);

  socket.on('data', (data) => {
    console.log(data);
  });

  socket.on('end', () => {
    console.log(`Client disconnected: ${socket.remoteAddress}: ${socket.remotePort}`);
  });

  socket.on('error', (err) => {
    console.log(`Socket error, ${err}`);
  });
});

server.listen(PORT, () => {
  console.log(`Multi Player Server listening on port ${PORT}`);
  console.log(server.address());
});
