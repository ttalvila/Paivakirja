describe('.validateInput', function(){
  describe('.validate()', function(){
    it('should return false', function(){
	assert(validateInput('kukkuu') == true, 'Too short input');
	assert(Array.isArray([]), 'empty arrays are arrays');
    })
  })
  describe('.dates', function(){
    it('should return a date difference', function(){
      var date = 'Sun May 26 2013 21:05:02 GMT+0300 (Suomen normaaliaika)';
      expect(prettyDate[date]).to.equal('foo');
      expect(prettyDate[new Date()]).to.equal(1);
    })
})
})
