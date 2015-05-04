var is = require('is')
  , to = require('to')

module.exports = function log(prefix){
  return function(d){
    is.arr(arguments[2]) && (arguments[2] = arguments[2].length)
    var args = to.arr(arguments)
    args.unshift(''.grey ? prefix.grey : prefix)
    return console.log.apply(console, args), d
  }
}