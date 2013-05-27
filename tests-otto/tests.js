describe('Function validateInput', function(){
  it('should accept sentence "This is a test entry."', function(){
    assert.isTrue(validateInput("This is a test entry."));
  })
  it('should not accept sentence "123"', function(){
    assert.isFalse(validateInput("123"));
  })
})
