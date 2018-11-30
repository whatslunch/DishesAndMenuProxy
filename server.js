require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
app.use(morgan('dev'));
var proxy = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, '/public')));

app.get(':id', (req, res) => {
  console.log(path.join(__dirname, '/public/index.html'));
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/:id', proxy({ target: 'http://ec2-18-223-247-137.us-east-2.compute.amazonaws.com:2000/', changeOrigin: true }))




app.listen(9000, () => {
  console.log('server listening at 9000');
});
