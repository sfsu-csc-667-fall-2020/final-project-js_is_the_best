const express = require('express');
const redis = requir('redis')

const app = express();

app.get('/', (req, res) => {
  res.send('hello')
});

app.listen(4010);