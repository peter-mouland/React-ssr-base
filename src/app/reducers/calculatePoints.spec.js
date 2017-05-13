import { expect } from 'chai';
import * as calculatePoints from './calculatePoints';

let position;

describe('calculatePoints', () => {
  it('returns 3 points for each start', () => {
    expect(calculatePoints.forStarting(1)).to.eql(3);
    expect(calculatePoints.forStarting(0)).to.eql(0);
    expect(calculatePoints.forStarting(10)).to.eql(30);
  });

  it('returns 1 points for each sub', () => {
    expect(calculatePoints.forSub(1)).to.eql(1);
    expect(calculatePoints.forSub(0)).to.eql(0);
    expect(calculatePoints.forSub(10)).to.eql(10);
  });

  it('returns 3 points for each assist', () => {
    expect(calculatePoints.forAssists(1)).to.eql(3);
    expect(calculatePoints.forAssists(0)).to.eql(0);
    expect(calculatePoints.forAssists(10)).to.eql(30);
  });

  it('returns -2 points for each yellow card', () => {
    expect(calculatePoints.forYellowCards(1)).to.eql(-2);
    expect(calculatePoints.forYellowCards(0)).to.eql(0);
    expect(calculatePoints.forYellowCards(10)).to.eql(-20);
  });

  it('returns -5 points for each red card', () => {
    expect(calculatePoints.forRedCards(1)).to.eql(-5);
    expect(calculatePoints.forRedCards(0)).to.eql(0);
    expect(calculatePoints.forRedCards(10)).to.eql(-50);
  });

  context('when a GK has points calculated', ()=>{

    beforeEach(()=>{
      position = 'GK';
    });

    it('returns 10 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(10);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(100);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(5);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(50);
    });

    it('returns -1 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(-1);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(-10);
    });
  });

  context('when a FB has points calculated', ()=>{
    beforeEach(()=>{
      position = 'FB';
    });

    it('returns 8 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(8);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(80);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(5);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(50);
    });

    it('returns -1 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(-1);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(-10);
    });
  });

  context('when a CB has points calculated', ()=>{
    beforeEach(()=>{
      position = 'CB';
    });

    it('returns 8 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(8);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(80);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(5);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(50);
    });

    it('returns -1 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(-1);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(-10);
    });
  });

  context('when a WM has points calculated', ()=>{
    beforeEach(()=>{
      position = 'WM';
    });
    it('returns 6 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(6);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(60);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(0);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(0);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(0);
    });
  });

  context('when a CM has points calculated', ()=>{
    beforeEach(()=>{
      position = 'CM';
    });

    it('returns 6 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(6);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(60);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(0);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(0);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(0);
    });
  });

  context('when a STR has points calculated', ()=>{
    beforeEach(()=>{
      position = 'STR';
    });

    it('returns 4 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).to.eql(4);
      expect(calculatePoints.forGoals(0, position)).to.eql(0);
      expect(calculatePoints.forGoals(10, position)).to.eql(40);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(0, position)).to.eql(0);
      expect(calculatePoints.forCleanSheet(10, position)).to.eql(0);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forConceeded(1, position)).to.eql(0);
      expect(calculatePoints.forConceeded(0, position)).to.eql(0);
      expect(calculatePoints.forConceeded(10, position)).to.eql(0);
    });
  });
});
