const {changeStatus} = require('./index')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { botToken } = require('./config');
require('./weather-bot.js')
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.listen(port);
setInterval(changeStatus,1000*60)