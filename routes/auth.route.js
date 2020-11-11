/*IMPORTS*/
const Router = require('koa-router');
const controller = require('../controller/auth.controller');
const router = new Router({
    prefix: '/api/auth'
  });

router.post('/login', async (ctx) => {
    await controller.login(ctx);
});

module.exports = router;