const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let kiosks = [
  { id: 1, description: 'Kiosk 1', serial: '123456', isOpen: true },
  { id: 2, description: 'Kiosk 2', serial: '654321', isOpen: false }
];

app.get('/kiosk', (req, res) => {
  res.json(kiosks);
});

app.post('/kiosk', (req, res) => {
  const kiosk = req.body;

  const highestId = kiosks.reduce((acc, curr) => {
    return curr.id > acc ? curr.id : acc;
  }, 0);

  kiosk.id = highestId + 1;
  
  kiosks.push(kiosk);
  res.status(201).json(kiosk);
});

app.put('/kiosk/:id', (req, res) => {
  const { id } = req.params;
  const updatedKiosk = req.body;
  const index = kiosks.findIndex(k => k.id === parseInt(id));
  if (index !== -1) {
    kiosks[index] = updatedKiosk;
    res.json(updatedKiosk);
  } else {
    res.status(404).json({ message: 'Kiosk not found' });
  }
});

app.delete('/kiosk/:id', (req, res) => {
  const { id } = req.params;
  const index = kiosks.findIndex(k => k.id === parseInt(id));
  if (index !== -1) {
    kiosks.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Kiosk not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
