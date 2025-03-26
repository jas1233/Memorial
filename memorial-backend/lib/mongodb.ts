import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongo:WjczkLCqtidEeEUTZpOVGAkRSmvcVEuV@mongodb.railway.internal:27017";

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI, { dbName: "memorial" });
};

export default connectToDatabase;

