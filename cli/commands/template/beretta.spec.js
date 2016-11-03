
import assert from 'assert';
import beretta from './beretta';

describe('A beretta', () => {
  it(`should return hello world`, () => {
    assert.equal(beretta(), 'hello world');
  });
});

describe('A beretta', () => {
  it(`should return hello john`, () => {
    assert.equal(beretta('john'), 'hello john');
  });
});