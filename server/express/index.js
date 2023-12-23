const bodyParser = require('body-parser')
const app = require('express')();

const bottleRoute = require('./routes/bottleRoute');
const processRoute = require('./routes/processRoute');
const authRoute = require('./routes/authRoute');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/bottles', bottleRoute);
app.use('/processes', processRoute);
app.use('/auth', authRoute);


module.exports = app;