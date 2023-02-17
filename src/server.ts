import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import Errors from './shared/middlewares/Errors';
import routes from './routes/routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(Errors);


app.listen(port, () => {
  console.log(`🚀 🚀 Server running on port ${port} 🚀 🚀`);
});
