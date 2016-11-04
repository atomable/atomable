const runtime = require('atomable-runtime');
const r = require('./proton/proton');

/** imports */

/**
 * handler() handles aws lambda events
 */
export const handler = (event, context, callback) => {
  runtime.handle(event, context, callback);
};
