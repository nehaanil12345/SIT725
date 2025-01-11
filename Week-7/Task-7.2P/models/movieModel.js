const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb+srv://nehaanil79:KreXDCTFU4l9VLkZ@cluster0.czelo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function getMovieByTitle(title) {
  try {
    await client.connect(); // Connect to MongoDB
    const database = client.db("sample_mflix"); // Use 'sample_mflix' database
    const movies = database.collection("movies"); // Access 'movies' collection

    // Query to find a movie by title
    const query = { title: title };
    const movie = await movies.findOne(query);

    return movie; // Return the movie document
  } catch (error) {
    console.error("Error in movieModel:", error);
    throw error;
  } finally {
    await client.close(); // Close MongoDB connection
  }
}

module.exports = { getMovieByTitle };
