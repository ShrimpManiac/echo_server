import net from 'net';
import dotenv from 'dotenv';
import { readHeader, writeHeader } from './utils.js';
import { TOTAL_LENGTH_SIZE, HANDLER_ID_SIZE } from './constants.js';

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to the server...');

  const message = 'Hello';
  const longMessage = 'V'.repeat(1024); // 메세지 길이 테스트
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 10);
  const packet = Buffer.concat([header, buffer]);

  client.write(packet);
});

client.on('data', (data) => {
  const buffer = Buffer.from(data);

  const { length, handlerId } = readHeader(data);
  console.log(`handlerId : ${handlerId}`);
  console.log(`length: ${length}`);

  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID_SIZE; // 6
  const message = buffer.subarray(headerSize);

  console.log(`Message received from server: ${message}`);
});

client.on('close', () => {
  console.log(`Connection closed`);
});

client.on('error', (err) => {
  console.log(`Client error, ${err}`);
});
