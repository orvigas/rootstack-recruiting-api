/*IMPORTS*/
const Router = require('koa-router');
const controller = require('../controller/job.controller');
const authenticated = require('../middleware/authenticated');

/*ROUTER INIT*/
const router = new Router({
  prefix: '/api/jobs'
});

router.use(authenticated);

router.get('/', async (ctx) => {
  await controller.getAllByUserId(ctx);
});

router.get('/:id', async (ctx) => {
  await controller.getById(ctx);
});

router.post('/', async (ctx) => {
  await controller.save(ctx);
});

router.put('/:id', async (ctx) => {
  await controller.update(ctx);
});

router.delete('/:id', async (ctx) => {
  await controller.delete(ctx);
});

module.exports = router;