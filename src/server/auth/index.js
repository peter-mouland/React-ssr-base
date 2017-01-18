/* eslint-disable consistent-return */
import router from 'koa-router';
import koaBody from 'koa-body';
import passport from 'koa-passport';

import { validateLoginForm, validateSignupForm } from './validate';
import handleError from '../middleware/handle-error';
import localSignupStrategy from '../passport/local-signup';
import localLoginStrategy from '../passport/local-login';

const parseBody = koaBody();
const authRouter = router({ prefix: '/auth' });

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

authRouter.post('/signup', parseBody, (ctx, next) => {
  const validationResult = validateSignupForm(ctx.request.body);
  ctx.type = 'json';
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  } else {
    return passport.authenticate('local-signup', (err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          ctx.status = 409;
          ctx.response.body = {
            success: false,
            message: 'Check the form for errors.',
            errors: {
              email: 'This email is already taken.'
            }
          };
        } else {
          ctx.status = 400;
          ctx.response.body = {
            success: false,
            message: 'Could not process the form.'
          };
        }
      } else {
        ctx.status = 200;
        ctx.response.body = {
          success: true,
          message: 'You have successfully signed up! Now you should be able to log in.'
        };
      }
    })(ctx, next);
  }
});

authRouter.post('/login', parseBody, async (ctx, next) => {
  const validationResult = validateLoginForm(ctx.request.body);
  ctx.type = 'json';
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.response.body = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    };
  } else {
    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          ctx.status = 400;
          ctx.response.body = {
            success: false,
            message: err.message
          };
        } else {
          ctx.status = 400;
          ctx.response.body = {
            success: false,
            message: 'Could not process the form.'
          };
        }
      } else {
        ctx.status = 200;
        ctx.response.body = {
          success: true,
          message: 'You have successfully logged in!',
          token,
          user: userData
        };
      }
    })(ctx, next);
  }
});


authRouter.use(handleError());

export default authRouter;
