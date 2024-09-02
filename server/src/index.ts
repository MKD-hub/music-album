
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import SongRouter from './routes/songs.route';
import bodyParser from 'body-parser';
import connectDB from './db/database';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use("/", SongRouter);

connectDB(process.env.URL!).then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
      console.warn(error)
  }
})
