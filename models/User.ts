import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: { type: String, unique: true },
  image: String,
  registrationCompleted: { type: Boolean, default: false },
  phone: String,
  bio: String,
  profilePic: String,
  location: String,
  socialLinks: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
