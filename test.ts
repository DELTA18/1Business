// test.ts
import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/the-project";

mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection failed", err));
