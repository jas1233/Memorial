const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const MemorialSchema = new mongoose.Schema({
  name: String,
  message: String,
});

const Memorial = mongoose.model("Memorial", MemorialSchema);

// Get all memorials
app.get("/api/memorials", async (req, res) => {
  const memorials = await Memorial.find();
  res.json(memorials);
});

// Add a new memorial
app.post("/api/memorials", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: "All fields are required" });

  const newMemorial = new Memorial({ name, message });
  await newMemorial.save();
  res.status(201).json(newMemorial);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
