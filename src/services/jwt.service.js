import jwt from "jsonwebtoken";

class jwtService {
  constructor() {
    this.jwt = jwt;
    this.key = process.env.KEY;
  }
  generateToken(user_id) {
    const token = this.jwt.sign({ user_id }, this.key, { expiresIn: "3d" });
    return token;
  }
  verifayToken(token) {
    const verifay = this.jwt.verify(token, this.key);
    return verifay;
  }
}
export default jwtService;
