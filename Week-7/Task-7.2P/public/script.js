document.getElementById("fetchMovieBtn").addEventListener("click", fetchMovie);
document.getElementById("insertHaikuBtn").addEventListener("click", insertHaiku);

// Import the socket.io library
const socket = io();

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
      body: JSON.stringify({ title: "New Haiku", content: "This is a haiku example." })
    });

    const data = await response.json();

    if (data.haikuId) {
      haikuResult.innerHTML = `Haiku inserted successfully! ID: ${data.haikuId}`;
    } else {
      haikuResult.innerHTML = "Failed to insert Haiku.";
    }
  } catch (error) {
    console.error(error);
    haikuResult.innerHTML = "Error inserting Haiku.";
  }
}

// Listen for WebSocket events
socket.on("newHaiku", (data) => {
  const notificationArea = document.getElementById("notificationArea");
  notificationArea.innerHTML = `
    <p>${data.message}</p>
    <p>Haiku Title: ${data.haiku.title}</p>
    <p>Haiku Content: ${data.haiku.content}</p>
  `;
});
