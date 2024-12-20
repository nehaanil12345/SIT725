const express = require("express");
const path = require("path");
const { getMovie } = require("./controllers/movieController");
const { createHaiku } = require("./controllers/haikuController");
const { getMovieByTitle } = require("./models/movieModel");
const { insertHaikuDocument } = require("./models/haikuModel");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/movie", getMovie);
app.post("/haiku", createHaiku);
app.get("/movie", getMovieByTitle)
app.post("/haiku", insertHaikuDocument);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
