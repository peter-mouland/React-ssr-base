import Chance from 'chance';
import supertest from 'supertest';
import cookie from 'react-cookie';
import Koa from 'koa';
import jwt from 'jsonwebtoken';

import apiRouter from '../../../src/server/api';
import fixtures from '../../config/fixtures';
import config from '../../../src/config/db.js'; // must be app secret not test secret!

const chance = new Chance();
let fakeState;
let fakeKey;
let fakeValue;
let fakeToken;

// Add fixture data -> Needed to get a valid token that points to a valid user in the test db
  const insertUsers = () => {
    return fixtures().then(([insertedUsers]) => {
      const payload = { sub: insertedUsers[0] };
      return jwt.sign(payload, config.jwtSecret);
    });
  };
// end Add fixture data

const server = new Koa();
server.use(apiRouter.routes());

describe('apiRouter', () => {

  beforeEach(()=>{
    fakeKey = chance.word();
    fakeValue = chance.word();
    fakeState = { [fakeKey]: fakeValue };
  });

  it('returns a 404 with unrecognised route', (done) => {
    supertest(server.callback())
      .get('/api/route-that-doesnt-exist/')
      .expect(404, /Not found/i)
      .end(done);
  });

  it('returns a 200 with a recognised route', (done) => {
    supertest(server.callback())
      .get('/api/')
      .expect(200, /healthy/i)
      .end(done);
  });

  it('returns a 401 when accessing a route that needs authorisation', (done) => {
    supertest(server.callback())
      .get('/api/dashboard')
      .expect(401, /Unauthorized/i)
      .end(done);
  });

  context('with a valid token', () => {
    it('returns a 401 when sending the token a an authorisation header without a cookie', (done) => {
      insertUsers().then(token => {
        supertest(server.callback())
          .get('/api/dashboard')
          .set('Authorization', 'Bearer ' + token)
          .expect(401)
          .end(done);
      })
    });

    it('returns a 401 when sending the token as a cookie without the auth header', (done) => {
      insertUsers().then(token => {
        cookie.save('token', token, { path: '/'});
        supertest(server.callback())
          .get('/api/dashboard')
          .expect(401)
          .end(done);
      });
    });
    it('returns a 200 when sending the token a an authorisation header', (done) => {
      insertUsers()
        .then(token => {
          cookie.save('token', token, { path: '/'});
          supertest(server.callback())
            .get('/api/dashboard')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, /You're authorized to see this secret message./i)
            .end(done)
        })
    });
  });

  context('with an invalid token', () => {
    beforeEach(()=>{
      fakeToken = chance.word();
    });
    it('returns a 401 when sending the token a an authorisation header', (done) => {
      cookie.save('token', fakeToken, { path: '/'});
      supertest(server.callback())
        .get('/api/dashboard')
        .set('Authorization', 'Bearer ' + fakeToken)
        .expect(401)
        .end(done);
    });
  });

});
