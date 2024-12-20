const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { insertHaikuDocument } = require("../models/haikuModel");

let mongoServer;
let uri;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();
});

afterAll(async () => {
  await mongoServer.stop();
});

describe("Haiku Model - insertHaikuDocument", () => {
  it("should insert a haiku and return the inserted ID", async () => {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("insertDB");
    const haiku = db.collection("haiku");

    const doc = { title: "Haiku Test", content: "This is a test haiku." };

    const insertedId = await insertHaikuDocument(doc);

    const insertedDoc = await haiku.findOne({ _id: insertedId });
    expect(insertedDoc).toEqual({ _id: insertedId, title: "Haiku Test", content: "This is a test haiku." });

    await client.close();
  });
});
