module.exports = function log(prefix){
  return function(d){
    return console.log(prefix, d), d
  }
}