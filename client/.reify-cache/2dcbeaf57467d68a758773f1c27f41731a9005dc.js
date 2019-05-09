"use strict";var expect;module.link('chai',{expect(v){expect=v}},0);

describe('add', () => {
  it('should add two numbers', () => {
    const x = 1
    const y = 2
    expect(x + y).to.be.equal(1 + 2)
  })
})
