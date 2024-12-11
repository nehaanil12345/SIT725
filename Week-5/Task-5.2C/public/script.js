document.getElementById("fetchMovieBtn").addEventListener("click", fetchMovie);
document.getElementById("insertHaikuBtn").addEventListener("click", insertHaiku);

// Fetch movie data
async function fetchMovie() {
  const movieResult = document.getElementById("movieResult");
  movieResult.innerHTML = "Loading...";

  try {
    const response = await fetch("/movie");
    const data = await response.json();

    if (data && data.title) {
      movieResult.innerHTML = `
        <strong>Title:</strong> ${data.title}<br>
        <strong>Year:</strong> ${data.year || "N/A"}<br>
        <strong>Plot:</strong> ${data.plot || "N/A"}
      `;
    } else {
      movieResult.innerHTML = "Movie not found!";
    }
  } catch (error) {
    console.error(error);
    movieResult.innerHTML = "Error fetching movie.";
  }
}

// Insert haiku document
async function insertHaiku() {
  const haikuResult = document.getElementById("haikuResult");
  haikuResult.innerHTML = "Inserting...";

  try {
    const response = await fetch("/haiku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });

    const data = await response.json();

    if (data._id) {
      haikuResult.innerHTML = `Haiku inserted successfully! ID: ${data._id}`;
    } else {
      haikuResult.innerHTML = "Failed to insert Haiku.";
    }
  } catch (error) {
    console.error(error);
    haikuResult.innerHTML = "Error inserting Haiku.";
  }
}
