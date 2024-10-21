import net from 'net';

const HOST = 'localhost';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to the server...');
});

socket.on('data', (data) => {
  console.log(data);
});

socket.on('close', () => {
  console.log(`Connection closed`);
});

socket.on('error', (err) => {
  console.log(`Client error, ${err}`);
});
