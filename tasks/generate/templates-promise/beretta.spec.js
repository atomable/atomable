module.exports = `
import assert from 'assert';
import { beretta } from './beretta';

describe('A beretta', () => {
  it('should return hello world', async () => {
   beretta().then(res =>  assert.equal(res, 'hello world');
  });
});

describe('A beretta', () => {
  it('should return hello john', async () => {
   beretta('john').then(res =>  assert.equal(res, 'hello john');
  });
});`;
