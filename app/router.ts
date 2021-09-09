import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const _jwt = middleware.jwt(); // 传入加密字符串
  // router.post('/user/register', controller.user.create);
  router.post('/user/login', controller.user.login);
  // router.get('/user/info', controller.user.info);
  router.get('/user/info', _jwt, controller.user.info);
  // router.resources('user', '/user', _jwt, controller.user);
};
