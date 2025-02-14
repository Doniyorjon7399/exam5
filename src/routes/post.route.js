import { Router } from "express";
import postController from "../controller/post.controller.js";

const controller = new postController();
const postRouter = Router();

postRouter.get("/", async (req, res) => {
  if (req.cookies.token) {
    const posts = await controller.allPostsController(req.cookies.token);
    // console.log(posts);
    res.render("home", {
      title: "home | exam",
      allPostError: req.flash("allPostError"),
      posts: posts.reverse(),
    });
  } else {
    res.render("index", {
      title: "exam",
    });
  }
});
postRouter.get("/posts/create", (req, res) => {
  if (req.cookies.token) {
    res.render("addPost", {
      title: "addPost | exam",
      addPostError: req.flash("addPostError"),
    });
  } else {
    res.redirect("/login");
    // res.render("index", {
    //   title: "exam",
    // });
  }
});
postRouter.post("/posts/create", async (req, res) =>
  controller.addPostController(req, res)
);

postRouter.post("/posts/delete/:id", async (req, res) =>
  controller.deletePostController(req, res)
);
postRouter.get("/myposts", async (req, res) => {
  if (req.cookies.token) {
    const posts = await controller.myPostController(req, res);
    res.render("home", {
      title: "myPost | exam",
      allPostError: req.flash("allPostError"),
      posts: posts.reverse(),
    });
  } else {
    res.redirect("/login");
    // res.render("index", {
    //   title: "exam",
    // });
  }
});
postRouter.get("/posts/edit/:id", async (req, res) => {
  if (req.cookies.token) {
    const posts = await controller.editPostsDataController(req.params.id);
    res.render("editPost", {
      title: "editPost | exam",
      posts: posts,
    });
  } else {
    res.render("index", {
      title: "exam",
    });
  }
});
postRouter.post("/post/edit/:id", async (req, res) =>
  controller.editPostController(req, res)
);
postRouter.get("/posts/search", async (req, res) => {
  if (req.cookies.token) {
    const posts = await controller.searchPostController(req, res);
    res.render("home", {
      title: "myPost | exam",
      allPostError: req.flash("allPostError"),
      posts: posts,
    });
  } else {
    res.redirect("/");
    // res.render("index", {
    //   title: "exam",
    // });
  }
});
export default postRouter;
