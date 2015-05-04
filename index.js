var is = require('is')

module.exports = function log(prefix){
  return function(d){
    is.arr(arguments[2]) && (arguments[2] = arguments[2].length)
    var args = [].slice.call(arguments, 0)
    args.unshift(''.grey ? prefix.grey : prefix)
    return console.log.apply(console, args), d
  }
}