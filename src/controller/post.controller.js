import postService from "../services/post.service.js";

class postController {
  constructor() {
    this.postService = new postService();
  }
  async allPostsController(token) {
    try {
      const posts = await this.postService.allPosts(token);
      // console.log(posts);

      return posts;
    } catch (error) {
      console.log(error.message);
    }
  }
  async addPostController(req, res) {
    try {
      const token = req.cookies.token;
      const body = req.body;
      const post = await this.postService.addPost(body, token);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.redirect("/");
    } catch (error) {
      req.flash("addPostError", error.message);
      res.redirect("/posts/create");
    }
  }
  async deletePostController(req, res) {
    try {
      const id = req.params.id;
      const token = req.cookies.token;
      const post = await this.postService.deletePost(id);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.redirect("/");
    } catch (error) {
      req.flash("addPostError", error.message);
      res.redirect("/");
    }
  }
  async myPostController(req, res) {
    try {
      const token = req.cookies.token;
      const post = await this.postService.myPost(token);
      return post;
      // res.cookie("token", token, { httpOnly: true, secure: true });
      // res.redirect("/");
    } catch (error) {
      console.log(error.message);
      // req.flash("addPostError", error.message);
      // res.redirect("/posts/create");
    }
  }
  async editPostsDataController(id) {
    try {
      const posts = await this.postService.editPostsData(id);
      // console.log(posts);
      return posts;
    } catch (error) {
      console.log(error.message);
    }
  }
  async editPostController(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const post = await this.postService.editPost(id, body);
      // console.log(post);
      res.redirect("/");
    } catch (error) {
      console.error(error.message);
      req.flash("addPostError", error.message);
      res.redirect("/");
    }
  }
  async searchPostController(req, res) {
    try {
      const query = req.query.q;
      const post = await this.postService.searchPost(query);
      return post;
      // res.cookie("token", token, { httpOnly: true, secure: true });
      // res.redirect("/");
    } catch (error) {
      console.log(error.message);
      // req.flash("addPostError", error.message);
      // res.redirect("/posts/create");
    }
  }
}
export default postController;
