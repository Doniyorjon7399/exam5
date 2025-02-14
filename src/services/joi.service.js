import Joi from "joi";
class joiService {
  constructor() {
    this.joi = Joi;
  }
  async validate(data) {
    const schema = this.joi.object({
      username: this.joi.string().min(4).max(20).required(),
      email: this.joi
        .string()
        .regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
      password: this.joi.string().min(5).max(20).required(),
      role: this.joi.string(),
    });
    await schema.validateAsync(data);
  }
  async validatepost(data) {
    const schema = this.joi.object({
      title: this.joi.string().min(2).max(30).required(),
      content: this.joi.string().min(2).max(3000).required(),
      category: this.joi.string().min(2).max(20).required(),
    });
    await schema.validateAsync(data);
  }
}
export default joiService;
