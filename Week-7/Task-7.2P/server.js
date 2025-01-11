const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const movieController = require("./controllers/movieController");
const haikuController = require("./controllers/haikuController");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define routes
app.get("/movie", movieController.getMovie);
app.post("/haiku", async (req, res) => {
  try {
    const result = await haikuController.createHaiku(req, res);
    // Notify all connected clients about the new Haiku
    io.emit("newHaiku", {
      message: "A new Haiku was created!",
      haiku: req.body,
    });
    return result;
  } catch (err) {
    console.error(err);
  }
});

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Listen for custom events (if needed)
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
