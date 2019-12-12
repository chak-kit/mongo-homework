const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const api = require('./routes');
const app = express();

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://localhost/users2';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);

app.use('*', (req, res) => {
  res.status(404).json({ error: "Page not found"})
});

app.use((err, req, res, next) => {
  console.log('From Error Handler:', err);
  res.status(err.status || 500).json({error: err.message});
});

const port = 4040;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
