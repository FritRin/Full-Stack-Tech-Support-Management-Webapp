const express = require('express');
const bodyParser = require('body-parser');
const queryRoutes = require('./queryRouter.js')
const sequelize = require('./database.js')

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use('/api', queryRoutes);

sequelize.sync().then(result => {
    app.listen(port);
}).catch(err => console.log(err));