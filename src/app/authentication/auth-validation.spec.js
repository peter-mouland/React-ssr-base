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
        expect(result.errors.email).to.equal(text.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.errors.message)
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
        expect(result.errors.password).to.equal(text.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.errors.message)
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
        expect(result.errors.email).to.equal(text.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.errors.password)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(undefined)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.errors.message)
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
        expect(result.errors.email).to.equal(text.errors.email)
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined)
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.errors.name)
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.errors.message)
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
});
