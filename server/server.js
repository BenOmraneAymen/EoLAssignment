const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./express/index.js')

var cors = require('cors');
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log('Server started on port',process.env.PORT);   
})