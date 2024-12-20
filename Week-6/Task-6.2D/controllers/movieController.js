const { getMovieByTitle } = require("../models/movieModel");

async function getMovie(req, res) {
  const title = "Back to the Future"; // Fixed title or dynamic from query params
  try {
    const movie = await getMovieByTitle(title);
    res.json(movie || { message: "Movie not found" });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).send("Error fetching movie");
  }
}

module.exports = { getMovie };
