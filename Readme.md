# wp-error

**Common logic to process WordPress.com API responses into JS Error objects**

Creates a JavaScript `Error` instance, with properties copied over from
the given object, and HTTP response status interpreted.


### Installation

Install `wp-error` using `npm`:

``` bash
$ npm install --save wp-error
```


### Examples

``` js
var err = new WPError({
  error: 'processing_failed',
  error_description: 'Invalid upload format',
);
err.toString();
// "ProcessingFailedError: Invalid upload format"
```


### License

MIT – Copyright Automattic 2016
