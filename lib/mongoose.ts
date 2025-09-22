// lib/mongoose.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in your .env file");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection", MONGODB_URI);
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // disable mongoose buffering
    }).then((mongoose) => {
      console.log("✅ New MongoDB connection established");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
