const { getMovie } = require("../controllers/movieController");
const { getMovieByTitle } = require("../models/movieModel");

jest.mock("../models/movieModel"); // Mock the model

describe("Movie Controller - getMovie", () => {
  it("should return movie details when found", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Mocking the database call
    getMovieByTitle.mockResolvedValue({ title: "Back to the Future", year: 1985 });

    await getMovie(req, res);

    expect(getMovieByTitle).toHaveBeenCalledWith("Back to the Future");
    expect(res.json).toHaveBeenCalledWith({ title: "Back to the Future", year: 1985 });
  });

  it("should return 'Movie not found' when no movie is found", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    getMovieByTitle.mockResolvedValue(null);

    await getMovie(req, res);

    expect(getMovieByTitle).toHaveBeenCalledWith("Back to the Future");
    expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
  });

  it("should handle errors and return status 500", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    getMovieByTitle.mockRejectedValue(new Error("Database error"));

    await getMovie(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error fetching movie");
  });
});
