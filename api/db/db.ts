import {Db, MongoClient} from 'mongodb';


export async function getDb(): Promise<Db> {
  const url = process.env["DATABASE_URL"] ?? "mongodb://localhost:27017";
  const client = new MongoClient(url);
  await client.connect();
  const database =  client.db("mydb");
  return database;
}