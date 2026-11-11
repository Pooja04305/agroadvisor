const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/crops', (req, res) => {
  db.all(`SELECT * FROM crops`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/crops/:cropId/pests', (req, res) => {
  db.all(`SELECT * FROM pests WHERE crop_id = ?`, [req.params.cropId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/pests/:pestId/remedies', (req, res) => {
  db.all(`SELECT * FROM remedies WHERE pest_id = ?`, [req.params.pestId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});