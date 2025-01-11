const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb+srv://nehaanil79:KreXDCTFU4l9VLkZ@cluster0.czelo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function insertHaikuDocument(doc) {
  try {
    await client.connect(); // Connect to MongoDB
    const database = client.db("insertDB"); // Use 'insertDB' database
    const haiku = database.collection("haiku"); // Access 'haiku' collection

    // Insert the document
    const result = await haiku.insertOne(doc);
    return result.insertedId; // Return the ID of the inserted document
  } catch (error) {
    console.error("Error in haikuModel:", error);
    throw error;
  } finally {
    await client.close(); // Close MongoDB connection
  }
}

module.exports = { insertHaikuDocument };
