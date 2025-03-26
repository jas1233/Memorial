import mongoose from "mongoose";

const MemorialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    dod: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

const Memorial = mongoose.models.Memorial || mongoose.model("Memorial", MemorialSchema);
export default Memorial;

