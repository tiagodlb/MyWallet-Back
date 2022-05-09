import db from "../db.js";

export async function signOut(req, res) {
  const token = res.locals.token;
  try {
    await db.collection("session").deleteOne({ token });
    return res.sentStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
