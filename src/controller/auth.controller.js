import userAuthService from "../services/auth.service.js";

class userAuthController {
  constructor() {
    this.authService = new userAuthService();
  }
  async registerController(req, res) {
    try {
      const body = req.body;
      const user = await this.authService.register(body);
      res.redirect("/login");
    } catch (error) {
      req.flash("registerError", error.message);
      res.redirect("/register");
    }
  }
  async loginController(req, res) {
    try {
      const body = req.body;
      const token = await this.authService.login(body);
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.redirect("/");
    } catch (error) {
      req.flash("loginError", error.message);
      res.redirect("/login");
    }
  }
  async logoutController(req, res) {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      req.flash("loginError", error.message);
      res.redirect("/login");
    }
  }
}
export default userAuthController;
