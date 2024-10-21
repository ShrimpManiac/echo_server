import net from 'net';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

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
