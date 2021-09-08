import { Service } from 'egg';

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
  public async create(params: object) {
    try {
      const data = await this.ctx.model.User.create(params);
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
}
