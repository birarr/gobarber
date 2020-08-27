import 'reflect-metadata';

import express, { json } from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Gtnc' }));

app.listen(3333, () => {
    console.log('8b Server started on 3333 port!!!');
});
