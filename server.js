const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const FILE = 'diemdanh.json';
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');

// API điểm danh
app.post('/diem-danh', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = new Date().toLocaleString();
  const name = req.body.name ? req.body.name.trim() : null;

  const log = { ip, time: now, name };

  const data = JSON.parse(fs.readFileSync(FILE));
  data.push(log);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

// API lấy dữ liệu điểm danh
app.get('/api/diemdanh', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🔵 Server chạy tại http://localhost:${PORT}`);
});
