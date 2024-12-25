import { WebSocketServer } from 'ws';

let doctorWSS;

export const initializeWebSocket = (server) => {
  // Use WebSocketServer here for ES6
  doctorWSS = new WebSocketServer({ server });

  doctorWSS.on('connection', (ws) => {
    console.log('WebSocket connected for doctor updates.');

    ws.on('close', () => console.log('WebSocket disconnected.'));
  });
};

export const broadcastDoctorUpdate = (data) => {
  if (doctorWSS) {
    doctorWSS.clients.forEach((client) => {
      // Ensure the client is open before sending data
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
};
