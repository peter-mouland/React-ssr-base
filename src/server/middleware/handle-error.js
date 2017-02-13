import debug from 'debug';

const log = debug('base:handleError.js');

export default function errorHandler(renderer) {
  return async (ctx, next) => {
    try {
      await next(); // attempt to invoke the next middleware downstream
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        log(err); // send to real logging system
      } else {
        log(err);
      }
      ctx.response.status = err.status || 500;
      if (renderer) {
        ctx.type = 'html';
        ctx.body = ctx[renderer](err);
      } else {
        ctx.type = 'json';
        ctx.body = { error: err };
      }
      ctx.app.emit('error', err, ctx);
    }
  };
}
