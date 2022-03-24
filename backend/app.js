const express = require('express');
const cors = require('cors');
const app = express();
const wsServer = require('express-ws')(app);
const aWss = wsServer.getWss(); //для широкої розсилки;
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
  // ws.send('text to client');
  ws.on('message', (mess) => {
    mess = JSON.parse(mess);
    switch (mess.method) {
      case 'connection':
        connectionHandler(ws, mess);
        break;

      case 'draw':
        newsletter(ws, mess);
        break;
    }
  });
});

// app.use('/api', require('./routes'));

//copy the link with the saved picture:
app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '');  //створ коректну силку, заміна;
    fs.writeFileSync(path.resolve(__dirname, `pictures`, `${req.query.id}.jpg`), data, 'base64');
                                                                                              //формат
    return res.status(200).json('Saved');
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

//open the current state:
app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, `pictures`, `${req.query.id}.jpg`));
    //навпаки, тепер створюєм робочу силку для читання на клієнті:
    const data = `data:image/png;base64,` + file.toString('base64');  //+форматуєм file;

    res.json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

app.listen(PORT, () => console.log(`Hello from port ${PORT}`));

const connectionHandler = (ws, mess) => {
  ws.id = mess.id;  //у кожної сесії свій id;
  newsletter(ws, mess); //розсила для інщих про підключення нового id;
};

const newsletter = (ws, mess) => {
  aWss.clients.forEach(client => { //пробігаєм по всіх відкритих сокетах, по типу map;
    if (client.id === mess.id) {
      client.send(JSON.stringify(mess));
    }
  });
};
