import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import queryRoutes from './routes/queryRouter.js';
import { Sequelize } from 'sequelize';
import sequelize from './util/database.js';

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use('/api', queryRoutes);

sequelize.sync().then(result => {
    app.listen(port);
}).catch(err => console.log(err));