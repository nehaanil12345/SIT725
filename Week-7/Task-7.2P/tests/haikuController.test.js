const { createHaiku } = require("../controllers/haikuController");
const { insertHaikuDocument } = require("../models/haikuModel");

jest.mock("../models/haikuModel"); // Mock the model

describe("Haiku Controller - createHaiku", () => {
  it("should create a haiku and return success message", async () => {
    const req = { body: { title: "My Haiku", content: "An example haiku" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    insertHaikuDocument.mockResolvedValue("mockedHaikuId");

    await createHaiku(req, res);

    expect(insertHaikuDocument).toHaveBeenCalledWith({ title: "My Haiku", content: "An example haiku" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Haiku created successfully!",
      haikuId: "mockedHaikuId",
    });
  });

  it("should return 400 if title or content is missing", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createHaiku(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Title and content are required." });
  });

  it("should handle errors and return status 500", async () => {
    const req = { body: { title: "Test", content: "Test content" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    insertHaikuDocument.mockRejectedValue(new Error("Insertion error"));

    await createHaiku(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Failed to create haiku." });
  });
});
