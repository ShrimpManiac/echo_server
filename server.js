import net from 'net';
import dotenv from 'dotenv';
import { readHeader, writeHeader } from './utils.js';
import { TOTAL_LENGTH_SIZE, HANDLER_ID_SIZE, MAX_MESSAGE_LENGTH } from './constants.js';
import handlers from './handlers/index.js';

dotenv.config();

const PORT = process.env.PORT;

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}: ${socket.remotePort}`);

  socket.on('data', (data) => {
    const buffer = Buffer.from(data);
    const { length, handlerId } = readHeader(buffer);
    console.log(`handlerId : ${handlerId}`);
    console.log(`length: ${length}`);

    if (length > MAX_MESSAGE_LENGTH) {
      console.error(`Error: message exceeded maximum length ${length} / ${MAX_MESSAGE_LENGTH}`);
      socket.write(`Error: message exceeded maximum length ${length} / ${MAX_MESSAGE_LENGTH}`);
      socket.end();
      return;
    }

    const handler = handlers[handlerId];

    if (!handler) {
      console.error(`Error: no handler found for ${handlerId}`);
      socket.write(`Error: no handler found for ${handlerId}`);
      socket.end();
      return;
    }

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID_SIZE; // 6
    const message = buffer.subarray(headerSize);

    console.log(`Message received from client: ${message}`);

    const responseMessage = 'Hi there!';
    const responseBuffer = Buffer.from(responseMessage);

    const header = writeHeader(responseBuffer.length, handlerId);
    const packet = Buffer.concat([header, responseBuffer]);

    socket.write(packet);
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
