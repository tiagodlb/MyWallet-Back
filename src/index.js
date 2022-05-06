import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import joi from "joi";
import dayjs from "dayjs";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./db.js";
import { ObjectId } from "mongodb";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.post("/sign-up", async (req, res) => {
  const signUp = req.body;
  const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const { error } = signUpSchema.validate(signUp, { abortEarly: false });
  if (error) {
    res.sendStatus(422).send(error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = await db
      .collection("users")
      .insertOne({ ...signUp, password: bcrypt.hashSync(signUp.password, 10) });
    console.log("Usuario criado", user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log("Erro ao registrar-se", error);
  }
});

app.post("/sign-in", async (req, res) => {
  const login = req.body;
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const { error } = loginSchema.validate(login, { abortEarly: false });
  if (error) {
    res.sendStatus(422).send(error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = await db.collection("users").findOne({ email: login.email });
    if (user && bcrypt.compareSync(login.password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ token, userID: user._id });
      res.status(200).send(token);
    } else res.sendStatus(404);
  } catch (error) {
    res.send(500);
    console.log("Erro ao logar", error);
  }
});

app.get("/wallet", async (req, res) => {
  const authorization = req.headers.authorization;
  console.log("authorization", authorization);

  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) {
    console.log("erro 1");
    res.sendStatus(401);
    return;
  }

  console.log("token", token);
  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    console.log("erro 2");
    res.status(401).send(authorization);
    return;
  }

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(session.userID) });
  if (!user) {
    console.log("erro 3");
    res.sendStatus(401);
    return;
  } else {
    delete user.password;
    res.send(user);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Servidor em pé na porta ${port}`));
});
