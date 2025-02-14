import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);
const postModel = mongoose.model("posts", postSchema);
export default postModel;
