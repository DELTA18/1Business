import mongoose from "mongoose";

const PostLikesSchema = new mongoose.Schema({
    postId : { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.PostLikes || mongoose.model("PostLikes", PostLikesSchema);