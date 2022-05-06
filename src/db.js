import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URL);
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO);
  console.log(
    "Conexão com o banco de dados MongoDB foi um sucesso! Ela se encontra na porta 5000"
  );
} catch (error) {
  console.log("Deu um erro ao tentar conectar amigo :(");
}

export default db;
