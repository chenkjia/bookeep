import { Context } from 'egg';
import { verify } from 'jsonwebtoken';
export default function jwtMiddleware() {
  return async (ctx: Context, next: any) => {
    console.log('jwt');
    const token = ctx.request.header.authorization;
    try {
      // 1.验证token不存在
      if (token === 'null' || !token) {
        throw {
          code: 401,
          msg: 'token不存在',
        };
      }
      // 2.验证token是否错误
      const decode:any = await verify(token + '', 'asdg4rrgttty3f');
      // 3.验证token是否超时
      if (decode && decode.exp < Math.floor(Date.now() / 1000)) {
        throw {
          code: 401,
          msg: 'token超时',
        };
      }
      console.log(decode);
      // 4.将登录信息传到接口内部
      ctx.state = decode;
      await next();
    } catch (error) {
      ctx.body = error;
      return;
    }
  };
}
