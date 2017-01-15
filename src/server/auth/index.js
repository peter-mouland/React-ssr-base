import router from 'koa-router';
import koaBody from 'koa-body';

import { validateLoginForm, validateSignupForm } from './auth';
import handleError from '../middleware/handle-error';

const parseBody = koaBody();
const authRouter = router({ prefix: '/auth' });


authRouter.post('/signup', parseBody, async (ctx) => {
  const validationResult = validateSignupForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.type = 'json';
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  }
  ctx.status = 200;
});

authRouter.post('/login', parseBody, (ctx) => {
  const validationResult = validateLoginForm(ctx.request.body);
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.type = 'json';
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  }
  ctx.status = 200;
});


authRouter.use(handleError());

export default authRouter;
