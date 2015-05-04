var is = require('is')

module.exports = function log(prefix){
  return function(d){
    is.arr(arguments[2]) && (arguments[2] = arguments.length)
    return console.log.bind(console, ''.grey ? prefix.grey : prefix).apply(console, arguments), d
  }
}