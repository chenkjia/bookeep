import { Controller } from 'egg';

const rule = {
  username: [{
    required: true,
    message: 'username is required' }],
  password: [{
    required: true,
    message: 'password is required',
  }, {
    min: 8,
  }],
};

export default class UserController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.user.index({});
    } catch (error) {
      ctx.body = error;
    }
  }
  async show() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.user.show(ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }
  async create() {
    const { ctx } = this;
    try {
      await ctx.validate(ctx.request.body, rule);
      ctx.body = await ctx.service.user.create(ctx.request.body);
    } catch (error) {
      ctx.body = error;
    }
  }
  async update() {
    const { ctx } = this;
    try {
      await ctx.validate(ctx.request.body, rule);
      ctx.body = await ctx.service.user.update(ctx.params.id, ctx.request.body);
    } catch (error) {
      ctx.body = error;
    }
  }
  async destroy() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.user.destroy(ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }
}
