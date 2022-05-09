import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import router from './routes/index.js'

const app = express();
app.use(json());
app.use(cors());
app.use(router)
dotenv.config();


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Servidor em pé na porta ${port}`));
});
