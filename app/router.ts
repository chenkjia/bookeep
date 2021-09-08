import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.resources('user', '/user', controller.user);
};
