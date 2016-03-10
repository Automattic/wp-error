var uppercamelcase = require('uppercamelcase');
var statusCodes = require('builtin-status-codes');

module.exports = WPError;

function WPError () {
  var self = new Error();

  for (var i = 0; i < arguments.length; i++) {
    process(self, arguments[i]);
  }

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(self, WPError);
  }

  return self;
}

function process ( self, data ) {
  if (typeof data === 'number') {
    // just a status code then 1  q
    setStatusCode( self, data );

  } else {
    // assume it's a plain 'ol Object with some props to copy over
    if (data.error) {
      self.name = toName(data.error);
    }

    if (data.error_description) {
      self.message = data.error_description;
    }

    for (var i in data) {
      self[i] = data[i];
    }

    if (self.status && (data.method || data.path)) {
      setStatusCodeMessage( self );
    }
  }
}

function setStatusCode ( self, code ) {
  self.name = toName( statusCodes[ code ] );
  self.status = self.statusCode = code;
  setStatusCodeMessage( self );
}

function setStatusCodeMessage ( self ) {
  var code = self.status;
  var method = self.method;
  var path = self.path;

  var m = code + ' status code';
  var extended = method || path;

  if ( extended ) m += ' for "';
  if ( method ) m += method;
  if ( extended ) m += ' ';
  if ( path ) m += path;
  if ( extended ) m += '"';

  self.message = m;
}

function toName ( str ) {
  return uppercamelcase( String(str).replace(/error$/i, ''), 'error' );
}
