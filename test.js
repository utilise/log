var expect = require('chai').expect
  , client = require('client')
  , owner = require('owner')
  , log = require('./')
  , to = require('to')

describe('log', function() {
  it('should log value untouched and return it', function() {
    var o = { a: 1 }
    expect(log('foo')(o)).to.equal(o)
  })

  it('should do nothing if no console', function() {
    var realConsole = owner.console
    delete owner.console
    expect(log('foo')('bar')).to.equal('bar')
    owner.console = realConsole
  })

  it('should loop over arrays compactly', function() {
    if (!owner.console) return
    var realLog = owner.console.log
      , realConsole = owner.console
      , result

    delete owner.console
    owner.console = { log: function(){ 
      result = to.arr(arguments).pop(); 
      realLog.apply && realLog.apply(realConsole, arguments) } }
    ;[1,2,3].map(log('foo'))
    expect(result).to.equal(3)
    owner.console = realConsole
  })

  !client && it('should print in color if exists', function() {
    if (!owner.console) return
    var prefix = 'foo'
      , realGrey = String.prototype.grey
      , realLog = owner.console.log
      , realConsole = owner.console
      , result

    delete owner.console
    owner.console = { log: function(){ 
      result = to.arr(arguments).shift(); 
      realLog.apply && realLog.apply(realConsole, arguments) } }
    String.prototype.grey = 'baz'

    expect(log(prefix)('bar')).to.equal('bar')
    expect(result).to.equal('baz')

    owner.console = realConsole
    String.prototype.grey = realGrey
  })

})