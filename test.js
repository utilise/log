var expect = require('chai').expect
  , owner = require('owner')
  , log = require('./')
  , to = require('to')

describe('log', function() {
  it('should log value untouched and return it', function() {
    var o = { a: 1 }
    expect(log('foo')(o)).to.equal(o)
  })

  it('should do nothing if no console', function() {
    var realLog = owner.console.log
      , realConsole = owner.console

    delete owner.console
    expect(log('foo')('bar')).to.equal('bar')
    owner.console = realConsole
  })

  it('should loop over arrays compactly', function() {
    var realLog = owner.console.log
      , realConsole = owner.console
      , result

    delete owner.console
    owner.console = { log: function(){ result = to.arr(arguments).pop(); realLog.apply(this, arguments) } }
    ;[1,2,3].map(log('foo'))
    expect(result).to.equal(3)
    owner.console = realConsole
  })

  it('should print in color if exists', function() {
    var prefix = 'foo'
      , realGrey = String.prototype.grey
      , realLog = owner.console.log
      , realConsole = owner.console
      , result

    delete owner.console
    owner.console = { log: function(){ result = to.arr(arguments).shift(); realLog.apply(this, arguments) } }
    String.prototype.grey = 'baz'

    expect(log(prefix)('bar')).to.equal('bar')
    expect(result).to.equal('baz')

    owner.console = realConsole
    String.prototype.grey = realGrey
  })

})