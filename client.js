import net from 'net';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to the server...');

  const message = 'Hello';
  const buffer = Buffer.from(message);
  client.write(buffer);
});

client.on('data', (data) => {
  console.log(data);
});

client.on('close', () => {
  console.log(`Connection closed`);
});

client.on('error', (err) => {
  console.log(`Client error, ${err}`);
});
