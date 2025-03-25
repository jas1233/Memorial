const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Define Memorial Schema
const MemorialSchema = new mongoose.Schema({
  name: String,
  birthDate: String,
  deathDate: String,
  message: String,
  image: String,
});

const Memorial = mongoose.model("Memorial", MemorialSchema);

// Add a new Memorial
app.post("/memorials", async (req, res) => {
  try {
    const memorial = new Memorial(req.body);
    await memorial.save();
    res.json({ message: "Memorial Added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add memorial" });
  }
});

// Get all Memorials
app.get("/memorials", async (req, res) => {
  try {
    const memorials = await Memorial.find();
    res.json(memorials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memorials" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
