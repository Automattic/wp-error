var err;
var WPError = require('./');
var assert = require('assert');


// map `error` to `name`, and `error_description` to `message`
err = new WPError({
  error: 'processing_failed',
  error_description: 'Invalid upload format',
});
assert.equal(err.name, 'ProcessingFailedError');
assert.equal(err.message, 'Invalid upload format');
assert.equal(err.error, 'processing_failed');


// Numbers are treated like HTTP status codes
err = new WPError(404);
assert.equal(err.name, 'NotFoundError');
assert.equal(err.message, '404 status code');


// chain multiple objects / status code
err = new WPError({ foo: 'bar' }, 403, { error: 'my_error' });
assert.equal(err.foo, 'bar');
assert.equal(err.name, 'MyError');
assert.equal(err.message, '403 status code');


// chain multiple objects / status code
err = new WPError(500, { message: 'wow' });
assert.equal(err.name, 'InternalServerError');
assert.equal(err.message, 'wow');


// error from OAuth "Deny" button
err = new WPError({
  error: 'access_denied',
  error_description: 'You need to log in to WordPress.com'
});
console.log(err);
assert.equal(err.name, 'AccessDeniedError');
assert.equal(err.message, 'You need to log in to WordPress.com');
