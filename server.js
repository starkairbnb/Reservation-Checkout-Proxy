const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware')
const port = process.env.port || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/api',
  proxy({
    target: 'http://localhost:3000',
    changeOrigin: true,
    router: {
      '/photos': 'http://localhost:3001',
      '/desc': 'http://localhost:3002',
      '/reservations': 'http://localhost:3003',
      '/rating': 'http://localhost:3004',
      '/reviews': 'http://localhost:3004'
    }
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
})