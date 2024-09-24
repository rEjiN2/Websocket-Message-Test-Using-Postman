import { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const wss = new WebSocketServer({ port: 8080 });

// Store connected users
const clients = new Map();

wss.on('connection', function connection(ws) {
  let clientId;

  // When a client sends a message (e.g., to register their username)
  ws.on('message', function message(data) {
    const parsedData = JSON.parse(data); // Assuming JSON messages
    if (parsedData.type === 'register') {
      // Register user
      clientId = parsedData.username;
      clients.set(clientId, ws); // Store WebSocket with username
      console.log(`${clientId} connected`); 
      ws.send(`Welcome, ${clientId}!`);
    } else if (parsedData.type === 'message') {
      // Handle message sending
      const targetClient = clients.get(parsedData.to); // Find the recipient by username
      if (targetClient) {
        const messageToSend = {
          from: clientId,
          message: parsedData.message,
        };
        targetClient.send(JSON.stringify(messageToSend)); // Send the message to the target user
      } else {
        ws.send('Recipient not found');
      }
    }
  });

  // Handle client disconnect
  ws.on('close', () => {
    if (clientId) {
      clients.delete(clientId);
      console.log(`${clientId} disconnected`);
    }
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket messaging server is running');
});

app.listen(6300, () => {
  console.log('HTTP server listening on *:6300');
});
