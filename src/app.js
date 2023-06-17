import express from 'express';
import logger from 'morgan';
import router from './routes.js';
import db from './config/db.js';
import createTable from './controller/createTable.js';

const app = express();
const port = process.env.PORT || 3333;

async function connectDB() {
  db.connect().then(client => {
    client.query('select $1::text as name', ['flights-db']).then(res => {
      client.release()
      createTable();
      console.log('--> connection successful with', res.rows[0].name)
    })
      .catch(e => {
        client.release()
        console.error('query error', e.message, e.stack)
      })
  })
};
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});