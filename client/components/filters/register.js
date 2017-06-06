'use strict';

var m = require('./module');

module.exports = function(name, parameters) {
  m.filter(name, parameters);
}
