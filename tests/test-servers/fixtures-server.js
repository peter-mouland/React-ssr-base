const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();

const config = require('../../src/config/environment');
let openServer;

const getData = (location) => new Promise((resolve, reject) => {
  try {
    const fixtures = require(`./fixtures/${location.toLocaleLowerCase()}.json`);
    resolve(fixtures)
  } catch (e) {
    reject({ errors: [{ message : 'no results found', stack: e }] });
  }
});

const catcher = (ctx, e) => { ctx.body = e; ctx.status = 500; return e; };


server.use(bodyparser({
  enableTypes: ['text'],
  extendTypes: {
    text: ['application/graphql'] // will parse application/x-javascript type body as a JSON string
  }
}));
server.use(async (ctx, next) => {
  ctx.status = 200;
  ctx.type = 'json';
  switch (true) {
    case !ctx.request.body :
      ctx.body = await getData(ctx.query.location).catch((e) => catcher(ctx, e));
      break;
    case ctx.request.body.includes('getDashboard') :
      ctx.body = { message: "You're authorized to see this secret message." };
      break;
    case ctx.request.body.includes('getSeasons') :
      const body = await getData('seasons').catch((e) => catcher(ctx, e));
      console.log(body.seasons)
      ctx.body = { data: { getSeasons: body.seasons } };
      break;
    default :
      ctx.body = { errors: [{ message : 'no fixture found for: ' + ctx.request.body }] };
      ctx.status = 404;
  }
  next();
});


const start = (done = function(){}) => {
  openServer = server.listen(process.env.FIXTURES_PORT, () => {
    console.log(`Fixtures listening at http://localhost:${process.env.FIXTURES_PORT}`); // eslint-disable-line
    done();
  });
  return openServer;
};


const stop = (done = function(){}) => {
  console.log('Closing fixtures server...');
  openServer.close(() => {
    done();
    process.exit(0);
  });
};


if (!module.parent){
  start()
}

module.exports = { start, stop };
