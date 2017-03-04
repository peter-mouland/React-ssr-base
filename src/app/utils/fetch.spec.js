import { expect, sinon } from '../../../tests/config/test.helper';
import Auth from '../authentication/auth-helper';
import Chance from 'chance';
import proxyquire from 'proxyquire';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
let axiosStub;
let axiosStubArguments;
let fetchLib;
let fetch;
let json;
let fakeAuth;

describe('fetch', ()=>{

  beforeEach(() => {
    fakeAuth = sandbox.stub(Auth, 'getToken').returns(false);
    axiosStub = ({ ...args }) => {
      axiosStubArguments = args;
      return Promise.resolve({ status: 200 });
    };
    fetchLib = proxyquire('./fetch', {
      'axios': axiosStub
    });
    fetch = fetchLib.fetch;
    json = fetchLib.json;
  });

  afterEach(()=>{
    sandbox.restore();
  });

  context(' URL ', ()=>{
    it('should return url with localhost by default', (done) => {
      const endpoint = chance.word();
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          headers: {},
          url: `http://localhost:undefined${endpoint}`
        })
        done()
      }).catch((e) => {
        done(e)
      })
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          headers: {},
          url: endpoint
        });
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      fetch.url(endpoint, { data }).then(()=>{
        expect(axiosStubArguments.data).to.equal(data);
        done()
      }).catch((e)=>{
        done(e)
      })
    });

    it('should return graphQL request options with params', (done) => {
      const endpoint = chance.word();
      const params = chance.sentence();
      fetch.url(endpoint, { params }).then(()=>{
        expect(axiosStubArguments.params).to.equal(params);
        done()
      }).catch((e)=>{
        done(e)
      })
    });

    it('should attach an auth token if valid', (done) => {
      const endpoint = chance.word();
      const fakeToken = chance.word()
      fakeAuth.returns(fakeToken)
      fetch.url(endpoint).then(()=>{
        expect(axiosStubArguments.headers).to.deep.equal({  Authorization: `Bearer ${fakeToken}` });
        done()
      }).catch((e)=>{
        done(e)
      })
    });

  });

  context(' graphQL ', ()=>{
    it('should return request options', (done) => {
      fetch.graphQL().then(() => {
        expect(axiosStubArguments.method).to.equal('POST')
        expect(axiosStubArguments.headers['Content-Type']).to.equal('application/graphql')
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with local graphQL endpoint', (done) => {
      fetch.graphQL().then(() => {
        expect(axiosStubArguments.url).to.equal("http://localhost:undefined/graphql/v1");
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with data', (done) => {
      const data = chance.sentence();
      fetch.graphQL(data).then(()=>{
        expect(axiosStubArguments.data).to.equal(data)
        done()
      }).catch((e)=>{
        done(e)
      })
    });

    it('should return graphQL request options with params', (done) => {
      const data = chance.sentence();
      const params = chance.sentence();
      fetch.graphQL(data, params).then(()=>{
        expect(axiosStubArguments.params).to.equal(params)
        done()
      }).catch((e)=>{
        done(e)
      })
    });

  });
});
