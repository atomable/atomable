module.exports = `
import assert from 'assert';
import { beretta } from './beretta';

describe('A beretta', () => {
  it('should return hello world', async () => {
    assert.equal(await beretta(), 'hello world');
  });
});

describe('A beretta', () => {
  it('should return hello john', async () => {
    assert.equal(await beretta('john'), 'hello john');
  });
});`;
