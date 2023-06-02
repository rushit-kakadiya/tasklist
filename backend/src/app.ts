import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import routes from './routes';
import { connectToDatabase } from './DB/mongo.db';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', routes);

app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).send({ message: err.message, data: {} });
  }
  next();
});

(async () => {
  await connectToDatabase()
    .then(() => {
      console.log('Connected to the database successfully!');
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error) => console.error(error.message));
})();
