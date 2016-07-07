var jsf = require('json-schema-faker');
var schema = require('./mockschema');
jsf.option({
  failOnInvalidTypes: false
});
jsf.extend('faker', function() {
  // just ignore the passed faker instance
  var faker = require('faker/locale/zh_CN');
  // do other stuff
  return faker;
});
var sample = jsf(schema);
console.dir(sample);

module.exports= sample;