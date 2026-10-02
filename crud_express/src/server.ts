import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Conectar ao Banco
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/products', productRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API CRUD com Express, MongoDB e TypeScript está rodando!');
});

// Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
