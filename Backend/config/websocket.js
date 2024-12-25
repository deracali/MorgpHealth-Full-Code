import { Server } from 'ws';

let doctorWSS;

export const initializeWebSocket = (server) => {
  doctorWSS = new Server({ server });

  doctorWSS.on('connection', (ws) => {
    console.log('WebSocket connected for doctor updates.');

    ws.on('close', () => console.log('WebSocket disconnected.'));
  });
};

export const broadcastDoctorUpdate = (data) => {
  if (doctorWSS) {
    doctorWSS.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  }
};
