const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files từ thư mục frontend
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/html-css', express.static(path.join(__dirname, 'html-css')));

// Route chính - redirect to html-css/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html-css', 'index.html'));
});

// Serve các file HTML khác
app.get('/*.html', (req, res) => {
  const fileName = req.params[0] + '.html';
  res.sendFile(path.join(__dirname, 'html-css', fileName));
});

app.listen(PORT, () => {
  console.log(`✓ Frontend server đang chạy tại http://localhost:${PORT}`);
});
