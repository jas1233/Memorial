import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Memorial Model
const memorialSchema = new mongoose.Schema({
  name: String,
  birthDate: String,
  deathDate: String,
  tribute: String,
});

const Memorial = mongoose.model("Memorial", memorialSchema);

// Routes
app.get("/api/memorials", async (req, res) => {
  try {
    const memorials = await Memorial.find();
    res.status(200).json(memorials);
  } catch (error) {
    res.status(500).json({ error: "Error fetching memorials" });
  }
});

app.post("/api/memorials", async (req, res) => {
  try {
    const newMemorial = new Memorial(req.body);
    await newMemorial.save();
    res.status(201).json(newMemorial);
  } catch (error) {
    res.status(500).json({ error: "Error creating memorial" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
