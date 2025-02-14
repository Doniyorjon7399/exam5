import { Router } from "express";
import userAuthController from "../controller/auth.controller.js";

const userRouter = Router();
const controller = new userAuthController();
userRouter.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("register", {
    title: "register | exam",
    registerError: req.flash("registerError"),
  });
});
userRouter.post("/register", async (req, res) =>
  controller.registerController(req, res)
);
userRouter.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("login", {
    title: "login | exam",
    loginError: req.flash("loginError"),
  });
});
userRouter.post("/login", async (req, res) =>
  controller.loginController(req, res)
);
userRouter.get("/logout", async (req, res) =>
  controller.logoutController(req, res)
);
export default userRouter;
