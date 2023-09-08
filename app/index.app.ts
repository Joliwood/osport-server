import * as url from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/main.router.js';
import accesHttp from './middleware/access.http.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(accesHttp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(`${dirname}/../public`)));

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(router);

export default app;
