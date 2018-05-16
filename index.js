const PORT = process.env.PORT || 8080;
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const Router = require('./src/Controllers');

// Redirect path to index.html for React
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.use(bodyParser.json());
app.use('/', Router);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
