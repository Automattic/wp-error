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
assert.equal(err.statusCode, 404);


// chain multiple objects / status code
err = new WPError({ foo: 'bar' }, 403, { error: 'my_error' });
assert.equal(err.foo, 'bar');
assert.equal(err.name, 'MyError');
assert.equal(err.error, 'my_error');
assert.equal(err.message, '403 status code');
assert.equal(err.statusCode, 403);


// chain multiple objects / status code
err = new WPError(500, { message: 'wow' });
assert.equal(err.name, 'InternalServerError');
assert.equal(err.message, 'wow');
assert.equal(err.statusCode, 500);


// error from OAuth "Deny" button
err = new WPError({
  error: 'access_denied',
  error_description: 'You need to log in to WordPress.com'
});
assert.equal(err.name, 'AccessDeniedError');
assert.equal(err.error, 'access_denied');
assert.equal(err.message, 'You need to log in to WordPress.com');


// the Batch API endpoint returns errors that looks like this
err = new WPError({
  status_code: 404,
  errors: {
    error: 'no_such_item',
    message: 'No item found in that feed with that ID'
  }
});
assert.equal(err.name, 'NoSuchItemError');
assert.equal(err.error, 'no_such_item');
assert.equal(err.message, 'No item found in that feed with that ID');
assert.equal(err.statusCode, 404);
assert.equal(err.status_code, 404);


// this is how the wpcom.js `.batch()` API would re-create an error object
// from the Batch API response for an individual failed endpoint
err = new WPError({ path: '/me', method: 'GET' }, { status_code: 404 });
assert.equal(err.name, 'NotFoundError');
assert.equal(err.message, '404 status code for "GET /me"');
assert.equal(err.statusCode, 404);
assert.equal(err.status_code, 404);


// from the `is-available` endpoint
err = new WPError({"error":"taken","message":"Choose a different email address. This one is not available.","status":"error"});
assert.equal(err.name, 'TakenError');
assert.equal(err.message, 'Choose a different email address. This one is not available.');
assert.equal(err.error, 'taken');
assert.equal(err.status, 'error');

// does not throw exception on empty input
assert.doesNotThrow(function(){
	new WPError(null);
	new WPError(undefined);
	new WPError({"name":"value"},null,undefined);
});
