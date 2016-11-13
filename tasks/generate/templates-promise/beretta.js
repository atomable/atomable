module.exports =
  `/**
 * beretta() returns a message
 * based on the passed-in firstName
 */
module.exports.beretta = (firstName) => {
  return new Promise((resolve, reject) => resolve(firstName ? 'hello ' + firstName : 'hello world'));
};`;
