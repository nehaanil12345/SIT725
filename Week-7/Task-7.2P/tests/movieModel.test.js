const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { getMovieByTitle } = require("../models/movieModel");

let mongoServer;
let uri;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();
});

afterAll(async () => {
  await mongoServer.stop();
});

describe("Movie Model - getMovieByTitle", () => {
  it("should return a movie when found", async () => {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("sample_mflix");
    const movies = db.collection("movies");

    await movies.insertOne({ title: "Back to the Future", year: 1985 });

    const result = await getMovieByTitle("Back to the Future");

    expect(result).toEqual({ title: "Back to the Future", year: 1985, _id: expect.anything() });

    await client.close();
  });
});
