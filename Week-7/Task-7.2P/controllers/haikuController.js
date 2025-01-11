const { insertHaikuDocument } = require("../models/haikuModel");

// Controller to Handle Haiku Creation
async function createHaiku(req, res) {
  try {
    // Extract data from request body
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    // Prepare haiku document
    const haikuData = { title, content };

    // Call the model to insert data into the database
    const result = await insertHaikuDocument(haikuData);

    // Respond with success message
    res.status(201).json({
      message: "Haiku created successfully!",
      haikuId: result.insertedId,
    });
  } catch (error) {
    console.error("Error inserting haiku:", error);
    res.status(500).json({ message: "Failed to create haiku." });
  }
}

module.exports = { createHaiku };
