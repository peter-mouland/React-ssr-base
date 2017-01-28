import router from 'koa-router';
import koaBody from 'koa-body';

import fetchCards from './fetch-cards';
import authCheck, { getUser } from '../middleware/auth-check';

const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

apiRouter.use(authCheck());
apiRouter.use(getUser());

apiRouter.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

apiRouter.get('/game/:gameType(people|films)/:card1/:card2', parseBody, async (ctx) => {
  const cards = [ctx.params.card1, ctx.params.card2];
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = await fetchCards(ctx.params.gameType, cards);
});

apiRouter.get('/dashboard',  (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { message: "You're authorized to see this secret message." };
});


apiRouter.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      console.log({ err })
      throw err;
    }
  });
});

export default apiRouter;
