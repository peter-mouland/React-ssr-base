import debug from 'debug';

const log = debug('lego:server-logger');

export default function logger() {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    log(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`);
  };
}
