import express, { json } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import cors from "cors";

import db from "./db.js";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor em pé na porta ${port}`);
});