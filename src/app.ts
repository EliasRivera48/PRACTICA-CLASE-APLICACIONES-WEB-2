import express from 'express';
import routes from './router/routes';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('¡Hola, Bienvenido al sistema!');
});

export default app;
