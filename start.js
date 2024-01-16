import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import authRouter from './routes/dashboard.js';
import { ErrorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users/auth', indexRouter);
app.use('/users/dashboards', authRouter);

app.use((req, res, next) => {
  try {
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

app.use(ErrorHandler);

app.set('port', process.env.PORT || 3012);

const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
