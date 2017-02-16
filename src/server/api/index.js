import router from 'koa-router';
import koaBody from 'koa-body';
import debug from 'debug';
import jwt from 'koa-jwt';

import fetchCards from './fetch-cards';
import authCheck from '../authentication/auth-check-middleware';

const config = require('../../config/db.json');

const log = debug('base:api');
const parseBody = koaBody();
const apiRouter = router({ prefix: '/api' });

apiRouter.use(async (ctx, next) => {
  try {
    await next(); // attempt to invoke the next middleware downstream
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      log(err); // send to real logging system
    } else {
      log(err);
    }
    ctx.response.status = err.status || 500;
    ctx.type = 'json';
    ctx.body = { error: err };

    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { message: 'Protected resource, you are unauthorized', error: err };
    } else {
      ctx.app.emit('error', err, ctx);
    }
  }
});

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

apiRouter.use(jwt({ secret: config.jwtSecret }));
apiRouter.use(authCheck());

apiRouter.get('/dashboard', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { message: "You're authorized to see this secret message." };
});

export default apiRouter;
