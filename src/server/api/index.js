import router from 'koa-router';
import koaBody from 'koa-body';
import debug from 'debug';
import fetchCards from './fetch-cards';
import authCheck from '../middleware/auth-check';

const log = debug('lego:api');
const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

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

apiRouter.use(authCheck());

apiRouter.get('/dashboard', (ctx) => {
  log('dashboard', { ctx });
  log('dashboard', { session: ctx.session });
  log('dashboard', { cookie: ctx.cookies.get('session') });

  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { message: "You're authorized to see this secret message." };
});


apiRouter.use((ctx, next) => next().catch((err) => {
  if (err.status === 401) {
    ctx.status = 401;
    ctx.body = 'Protected resource, use Authorization header to get access\n';
  } else {
    throw err;
  }
}));

export default apiRouter;