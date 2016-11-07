const runtime = require('atomable-runtime');

/** imports */

/**
 * handler() handles aws lambda events
 */
export const handler = (event, context, callback) => {
  runtime.handle(event, context, callback);
};
