require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
app.use(morgan('dev'));
var proxy = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/:id', (req, res) => {
  console.log(path.join(__dirname, '/public/index.html'));
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/restaurants/:restaurant_id', proxy({ target: 'http://ec2-18-223-247-137.us-east-2.compute.amazonaws.com:2000/', changeOrigin: true }))

app.use('/api/:id', proxy({ target: 'http://3.16.143.18', changeOrigin: true }))

app.use('/api/overview/:id', proxy({ target: 'http://54.144.31.20', changeOrigin: true }))

app.use('/api/:restaurant_id/reservations', proxy({ 
  target: 'http://ec2-34-216-238-63.us-west-2.compute.amazonaws.com/nomnoms/4689cca8-5498-45e3-8761-ab3ce1962358', changeOrigin: true 
}))


app.listen(9000, () => {
  console.log('server listening at 9000');
});
