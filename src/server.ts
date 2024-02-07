import express from 'express';
import cookieParser from 'cookie-parser';
import productRouter from './router/product_router';
import { errorMiddleWare } from './middlewares/error_middleware';
import authRouter from './router/auth_router';
import { requireUser } from './middlewares/require_user_middleware';
import { deserializeUser } from './middlewares/deserialize_user_middleware';

const app = express();

const port = process.env.PORT;
console.clear();

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.use(deserializeUser);

app.use('/products', productRouter);

app.use(errorMiddleWare);
process.on('uncaughtException', () => console.log('uncought exceptio'));
app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
