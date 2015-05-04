module.exports = function log(prefix){
  return function(d){
    return console.log.bind(console, ''.grey ? prefix.grey : prefix).apply(console, arguments), d
  }
}