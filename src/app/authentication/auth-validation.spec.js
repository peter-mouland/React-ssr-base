import Chance from 'chance';
import { expect } from '../../../tests/support/test.helper';
import {
  validateSignupForm, validateLoginForm, validateSignupResponse, validateLoginResponse, text
} from './auth-validation';

const chance = new Chance();
let result;

describe('auth-validation', ()=>{

  describe('validateSignupForm',  ()=>{

    context('with no payload', ()=>{
      beforeEach(()=>{
        result = validateSignupForm();
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.signupForm.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.signupForm.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.signupForm.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signupForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid email', ()=>{
      beforeEach(()=>{
        result = validateSignupForm({ email: chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.signupForm.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.signupForm.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signupForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid name', ()=>{
      beforeEach(()=>{
        result = validateSignupForm({ name: chance.word() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.signupForm.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.signupForm.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(undefined)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signupForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid password', ()=>{
      beforeEach(()=>{
        result = validateSignupForm({ password: chance.word({length: 8}) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.signupForm.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.signupForm.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signupForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid details', ()=>{

      beforeEach(()=>{
        result = validateSignupForm({ password: chance.word({length: 8}), name:chance.word(), email:chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(undefined)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal('')
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(true);
      });
    });
  });

  describe('validateLoginForm',  () => {

    context('with no payload', ()=>{
      beforeEach(()=>{
        result = validateLoginForm();
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.loginForm.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.loginForm.errors.password)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid email', ()=>{
      beforeEach(()=>{
        result = validateLoginForm({ email: chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.loginForm.errors.password)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid password', ()=>{
      beforeEach(()=>{
        result = validateLoginForm({ password: chance.word({length: 8}) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.loginForm.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message)
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    context('with a valid details', ()=>{

      beforeEach(()=>{
        result = validateLoginForm({ password: chance.word({length: 8}), name:chance.word(), email:chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal('')
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(true);
      });
    });
  });

  describe('validateSignupResponse',  () => {

    it('returns a successful 200 status if no error is passed', () => {
      const successResponse = validateSignupResponse();
      expect(successResponse.status).to.equal(200);
      expect(successResponse.body.success).to.equal(true);
      expect(successResponse.body.message).to.equal(text.signupResponse.success);
    });

    it('returns a 409 status for MongoError 11000', () => {
      const successResponse = validateSignupResponse({ name: 'MongoError', code: 11000 });
      expect(successResponse.status).to.equal(409);
      expect(successResponse.body.success).to.equal(false);
      expect(successResponse.body.message).to.equal(text.signupResponse.errors.message);
      expect(successResponse.body.errors.email).to.equal(text.signupResponse.errors.email);
    });

    it('returns a 400 status for other errors', () => {
      const successResponse = validateSignupResponse({ name: chance.word() });
      expect(successResponse.status).to.equal(400);
      expect(successResponse.body.success).to.equal(false);
      expect(successResponse.body.message).to.equal(text.signupResponse.error400);
    });

  });

  describe('validateLoginResponse',  () => {

    it('returns a successful 200 status with token and userData if no error is passed', () => {
      const fakeToken = chance.apple_token();
      const fakeUserData = chance.word();
      const response = validateLoginResponse(false, fakeToken, fakeUserData);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal(text.loginResponse.success);
      expect(response.body.token).to.equal(fakeToken);
      expect(response.body.user).to.equal(fakeUserData);
    });

    it('returns a 409 status for IncorrectCredentialsError', () => {
      const message = chance.word();
      const response = validateLoginResponse({ name: 'IncorrectCredentialsError', message });
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal(message);
    });

    it('returns a 400 status for other errors', () => {
      const response = validateLoginResponse({ name: chance.word() });
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal(text.loginResponse.error400);
    });

  });

});
