const express = require('express');
const app = express();
const wsServer = require('express-ws')(app);
const aWss = wsServer.getWss(); //для широкої розсилки;

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
  // ws.send('text to client');
  ws.on('message', (mess) => {
    mess = JSON.parse(mess);
    switch (mess.method) {
      case 'connection':
        connectionHandler(ws, mess);
        break;
    }
  });
});

app.listen(PORT, () => console.log(`Hello from port ${PORT}`));

const connectionHandler = (ws, mess) => {
  ws.id = mess.id;  //у кожної сесії свій id;
  newsletter(ws, mess); //розсила для інщих про підключення нового id;
};

const newsletter = (ws, mess) => {
  aWss.clients.forEach(client => { //пробігаєм по всіх відкритих сокетах, по типу map;
    if (client.id === mess.id) {
      client.send(JSON.stringify(`${mess.username} connected`));
    }
  });
};
