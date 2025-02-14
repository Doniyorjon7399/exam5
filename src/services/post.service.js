import postModel from "../models/post.schema.js";
import userModel from "../models/user.model.js";
import joiService from "./joi.service.js";
import jwtService from "./jwt.service.js";
import mongoose from "mongoose";

class postService {
  constructor() {
    this.postModel = postModel;
    this.userModel = userModel;
    this.jwtService = new jwtService();
    this.joi = new joiService();
  }
  async allPosts(token) {
    const user = this.jwtService.verifayToken(token);
    const allposts = await this.postModel.aggregate([
      {
        $lookup: {
          localField: "author",
          foreignField: "_id",
          from: "users",
          as: "author",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          author: 1,
          createdAt: 1,
          user_id: user.user_id,
        },
      },
      {
        $unwind: "$author",
      },
    ]);

    return allposts;
  }
  async addPost(body, token) {
    await this.joi.validatepost(body);
    const user = this.jwtService.verifayToken(token);
    const post = await this.postModel.create({ ...body, author: user.user_id });
    const data = await this.postModel.aggregate([
      {
        $match: {
          _id: post._id,
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          author: 1,
          createdAt: 1,
        },
      },
    ]);
    return { succes: true, post: data[0] };
  }
  async deletePost(id) {
    // const user = this.jwtService.verifayToken(token);
    const deletePost = await this.postModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );
  }
  async myPost(token) {
    const user = this.jwtService.verifayToken(token);
    const posts = await this.postModel
      .find({
        author: new mongoose.Types.ObjectId(user.user_id),
      })
      .populate("author");

    // console.log(posts);
    return posts;
  }
  async editPostsData(id) {
    // const user = this.jwtService.verifayToken(token);
    const findPost = await this.postModel.findOne(
      new mongoose.Types.ObjectId(id)
    );
    return findPost;
  }
  async editPost(id, body) {
    const findId = await this.postModel
      .findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        { $set: body },
        { new: true, runValidators: true }
      )
      .select("title content -_id");
    return findId;
  }
  async searchPost(query) {
    const posts = await this.postModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      })
      .populate("author");
    return posts;
  }
}

export default postService;
