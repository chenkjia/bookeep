import { Service } from 'egg';
import { sign } from 'jsonwebtoken';
import md5 = require('md5');
// import jwt = require('jsonwebtoken');
/**
 * User Service
 */
export default class UserService extends Service {
  public async index(params: object) {
    try {
      const data = await this.ctx.model.User.find(params);
      return this.ctx.resFormat.success(data);
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
  public async show(id: string) {
    try {
      const data = await this.ctx.model.User.findById(id);
      if (!data) {
        throw this.ctx.resFormat.notFound();
      }
      return this.ctx.resFormat.success(data);
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
  public async create({ username, password }) {
    try {
      const data = await this.ctx.model.User.create({
        username,
        password: md5(password + 'asdg4rrgttty3f'),
      });
      return this.ctx.resFormat.success(data);
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
  public async update(id:string, params: object) {
    try {
      await this.ctx.model.User.updateOne({ _id: id }, params);
      return this.ctx.resFormat.success();
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
  public async destroy(id:string) {
    try {
      const data = await this.ctx.model.User.deleteOne({ _id: id });
      if (!data.deletedCount) {
        throw this.ctx.resFormat.notFound;
      }
      return this.ctx.resFormat.success();
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
  public async login({ username, password }) {
    try {
      // 1.拿到通过username拿到数据库的password，下文叫user.password，出错则返回错误信息
      const user = await this.ctx.model.User.findOne({ username });
      // 2.把password加密
      const tmpPassword = md5(password + 'asdg4rrgttty3f');
      // 3.password与dbPassword对比是否相同，不同则返回登录失败信息
      if (user.password !== tmpPassword) {
        throw {
          code: -1,
          message: 'login fail',
        };
      }
      // 4.生成token
      const token = sign({
        id: user._id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
        // expiresIn: '3m',
      }, 'asdg4rrgttty3f');
      // 5.返回成功登录信息
      return {
        code: 0,
        message: 'login success',
        data: { token },
      };
    } catch (error) {
      throw this.ctx.resFormat.common(error);
    }
  }
}
