var uppercamelcase = require('uppercamelcase');

module.exports = WPError;

function WPError (data) {
  var self = new Error();

  if (data.error) {
    self.name = toTitle(data.error);
  }

  if (data.error_description) {
    self.message = data.error_description;
  }

  for (var i in data) {
    self[i] = data[i];
  }

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(self, WPError);
  }

  return self;
}

function toTitle (str) {
  return uppercamelcase(String(str).replace(/error$/i, ''), 'error');
}
