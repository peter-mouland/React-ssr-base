import router from 'koa-router';
import koaBody from 'koa-body';

import fetchCards from './fetch-cards';
import authCheck from '../middleware/auth-check';
import handleError from '../middleware/handle-error';

const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

apiRouter.use(authCheck());

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

apiRouter.get('/dashboard', async (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = await (() => "You're authorized to see this secret message.")();
});


apiRouter.use(handleError());

export default apiRouter;
