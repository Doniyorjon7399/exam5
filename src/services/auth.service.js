import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import joiService from "./joi.service.js";
import jwtService from "./jwt.service.js";

class userAuthService {
  constructor() {
    this.userModel = userModel;
    this.joi = new joiService();
    this.jwt = new jwtService();
  }
  async register(body) {
    const findUser = await this.userModel.findOne({ username: body.username });
    if (findUser) throw new Error("user alredy exited");
    const findUse = await this.userModel.findOne({ email: body.email });
    if (findUse) throw new Error("email  alredy exited");
    await this.joi.validate(body);
    const hashpassword = await bcrypt.hash(body.password, 12);
    const user = await this.userModel.create({
      ...body,
      password: hashpassword,
    });
  }
  async login(body) {
    await this.joi.validate(body);
    const user = await this.userModel.findOne({ username: body.username });
    if (!user) throw new Error("user not found");
    const password = await bcrypt.compare(body.password, user.password);
    if (!password) throw new Error("incorrect password");
    const token = this.jwt.generateToken(user._id);
    return token;
  }
}
export default userAuthService;
