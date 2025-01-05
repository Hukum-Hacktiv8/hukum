import { MongoClient } from "mongodb";
const uri = "mongodb+srv://ragaramadhannur2017:auM14BNUefXtvc8Q@databasemongodb.cof7z.mongodb.net/?retryWrites=true&w=majority&appName=databaseMongoDb";
let client: MongoClient;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};
