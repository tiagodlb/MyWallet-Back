import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function loadSignup(req, res) {
  const token = res.locals.token;

  try {
    const session = await db.collection("session").findOne({ token });
    const signup = await db
      .collection("sign-ups")
      .find({ signupUserId: new ObjectId(session.userId) })
      .toArray();

    res.sendStatus(200).send(signup);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deposit(req, res) {
  const { value, description } = req.body;
  const token = res.locals.token;

  try {
    const session = await db.collection("session").findOne({ token });

    const time = dayjs().locale("pt-br").format("DD/MM");

    await db.collection("sign-ups").insertOne({
      value: Number(value),
      description: description,
      isCredit: true,
      date: time,
      signupUserId: session.userId,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function withdraw(req, res) {
  const { value, description } = req.body;
  const token = res.locals.token;

  try {
    const session = await db.collection("session").findOne({ token });
    const time = dayjs().locale("pt-br").format("DD/MM");
    await db.collection("sign-ups").insertOne({
      value: -Math.abs(value),
      description: description,
      isCredit: false,
      date: time,
      signupUserId: session.userId,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
