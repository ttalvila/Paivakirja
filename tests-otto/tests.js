describe('Function validateInput', function(){
  it('should accept sentence "This is a test entry."', function(){
    assert.isTrue(validateInput("This is a test entry."));
  })
  it('should not accept sentence "123"', function(){
    assert.isFalse(validateInput("123"));
  })
})

describe('Function initPage', function(){
  it('should set status=0', function(){
    assert.equal(status, 0);
  })
  it('should set field value "Write a new message here"', function(){
    assert.equal(document.getElementsByTagName('input')[0].value, 'Write a new message here');
  })
})
