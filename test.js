var expect = require('chai').expect
  , log = require('./')('sth')

describe('log', function() {
  it('should log value untouched and return it', function() {
    var o = { a: 1 }
    expect(log(o)).to.equal(o)
  })
})